import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

export type RoomFaces = {
  front: string;
  back: string;
  left: string;
  right: string;
  top?: string;
  bottom?: string;
};

export type RoomPosition = {
  id: string;
  label: string;
  /** World position inside the room (camera eye). */
  x: number;
  y: number;
  z: number;
  /** Optional look yaw in radians when jumping to this spot. */
  yaw?: number;
};

type RoomView3DProps = {
  src?: string;
  panorama?: string;
  faces?: RoomFaces;
  /** Override default stand-points. */
  positions?: RoomPosition[];
  className?: string;
};

const DEFAULT_POSITIONS: RoomPosition[] = [
  { id: "center", label: "Center", x: 0, y: 0, z: 0, yaw: 0 },
  { id: "balcony", label: "Balcony", x: 0, y: 0, z: -4.5, yaw: 0 },
  { id: "sofa", label: "Sofa", x: -3.2, y: 0, z: 2.2, yaw: -0.55 },
  { id: "tv", label: "TV wall", x: 4.2, y: 0, z: 0, yaw: Math.PI / 2 },
  { id: "art", label: "Art wall", x: 0, y: 0, z: 4.5, yaw: Math.PI },
];

function makeSolidTexture(color: string, size = 8) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, size, size);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function prepMap(texture: THREE.Texture) {
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Look around + change stand position (presets / WASD).
 */
export function RoomView3D({
  src,
  panorama,
  faces,
  positions: positionsProp,
  className,
}: RoomView3DProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const apiRef = useRef<{
    goTo: (p: RoomPosition) => void;
  } | null>(null);

  const canMove = Boolean(panorama || faces?.front);
  const positions = useMemo(
    () =>
      canMove
        ? positionsProp?.length
          ? positionsProp
          : DEFAULT_POSITIONS
        : [{ id: "center", label: "Center", x: 0, y: 0, z: 0 }],
    [canMove, positionsProp],
  );

  const [activePos, setActivePos] = useState(positions[0]?.id ?? "center");

  useEffect(() => {
    setActivePos(positions[0]?.id ?? "center");
  }, [positions]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const mode = panorama ? "pano" : faces?.front ? "cube" : "cylinder";
    const allowWalk = mode !== "cylinder";

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b1f2a);

    const camera = new THREE.PerspectiveCamera(
      mode === "cylinder" ? 70 : 78,
      1,
      0.1,
      2000,
    );
    camera.position.set(0, 0, 0);
    camera.rotation.order = "YXZ";

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.touchAction = "none";
    renderer.domElement.setAttribute(
      "aria-label",
      "3D room view — drag to look, change position below",
    );
    host.appendChild(renderer.domElement);

    const room = new THREE.Group();
    scene.add(room);

    const loader = new THREE.TextureLoader();
    let disposed = false;
    const textures: THREE.Texture[] = [];
    const materials: THREE.Material[] = [];

    let yawMax = Math.PI;
    let pitchMax = THREE.MathUtils.degToRad(72);
    let fullYaw = mode !== "cylinder";
    const moveLimit = mode === "cube" ? 6.5 : 5.5;

    const track = <T extends THREE.Texture>(t: T) => {
      textures.push(t);
      return t;
    };
    const trackMat = <T extends THREE.Material>(m: T) => {
      materials.push(m);
      return m;
    };

    if (mode === "pano" && panorama) {
      const geometry = new THREE.SphereGeometry(500, 64, 48);
      geometry.scale(-1, 1, 1);
      const material = trackMat(
        new THREE.MeshBasicMaterial({ color: 0x1a3340 }),
      );
      room.add(new THREE.Mesh(geometry, material));

      loader.load(panorama, (texture) => {
        if (disposed) {
          texture.dispose();
          return;
        }
        prepMap(texture);
        track(texture);
        material.map = texture;
        material.color.set(0xffffff);
        material.needsUpdate = true;
      });
    } else if (mode === "cube" && faces) {
      const size = 20;
      const geometry = new THREE.BoxGeometry(size, size, size);
      const placeholders = [
        trackMat(
          new THREE.MeshBasicMaterial({ color: 0x2a2a2a, side: THREE.BackSide }),
        ),
        trackMat(
          new THREE.MeshBasicMaterial({ color: 0x2a2a2a, side: THREE.BackSide }),
        ),
        trackMat(
          new THREE.MeshBasicMaterial({
            map: track(makeSolidTexture("#f2eee6")),
            side: THREE.BackSide,
          }),
        ),
        trackMat(
          new THREE.MeshBasicMaterial({
            map: track(makeSolidTexture("#c4b8a4")),
            side: THREE.BackSide,
          }),
        ),
        trackMat(
          new THREE.MeshBasicMaterial({ color: 0x2a2a2a, side: THREE.BackSide }),
        ),
        trackMat(
          new THREE.MeshBasicMaterial({ color: 0x2a2a2a, side: THREE.BackSide }),
        ),
      ];

      room.add(new THREE.Mesh(geometry, placeholders));

      const assign = (index: number, url: string) => {
        loader.load(url, (texture) => {
          if (disposed) {
            texture.dispose();
            return;
          }
          prepMap(texture);
          track(texture);
          const mat = placeholders[index];
          mat.map?.dispose();
          mat.map = texture;
          mat.color.set(0xffffff);
          mat.needsUpdate = true;
        });
      };

      assign(0, faces.right);
      assign(1, faces.left);
      assign(4, faces.back);
      assign(5, faces.front);
      if (faces.top) assign(2, faces.top);
      if (faces.bottom) assign(3, faces.bottom);
    } else if (src) {
      fullYaw = false;
      const material = trackMat(
        new THREE.MeshBasicMaterial({
          color: 0x1a3340,
          side: THREE.BackSide,
        }),
      );

      let geometry: THREE.BufferGeometry | null = null;
      let mesh: THREE.Mesh | null = null;

      const buildCylinder = (aspect: number) => {
        if (mesh) {
          room.remove(mesh);
          geometry?.dispose();
        }
        const radius = 12;
        const thetaLength = THREE.MathUtils.clamp(
          Math.PI * (0.55 + aspect * 0.12),
          Math.PI * 0.7,
          Math.PI * 1.15,
        );
        const height = (radius * thetaLength) / aspect;
        geometry = new THREE.CylinderGeometry(
          radius,
          radius,
          height,
          96,
          1,
          true,
          Math.PI - thetaLength / 2,
          thetaLength,
        );
        mesh = new THREE.Mesh(geometry, material);
        room.add(mesh);
        yawMax = thetaLength * 0.38;
        pitchMax = Math.atan((height * 0.42) / radius);
      };

      buildCylinder(16 / 9);

      loader.load(src, (texture) => {
        if (disposed) {
          texture.dispose();
          return;
        }
        prepMap(texture);
        track(texture);
        const img = texture.image as { width: number; height: number };
        const aspect =
          img?.width && img?.height ? img.width / img.height : 16 / 9;
        buildCylinder(aspect);
        material.map = texture;
        material.color.set(0xffffff);
        material.needsUpdate = true;
      });
    }

    let yaw = 0;
    let pitch = 0;
    let targetYaw = 0;
    let targetPitch = 0;

    const pos = new THREE.Vector3(0, 0, 0);
    const targetPos = new THREE.Vector3(0, 0, 0);

    const keys = new Set<string>();

    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let hintHidden = false;
    let scrollLocked = false;

    const hideHint = () => {
      if (hintHidden) return;
      hintHidden = true;
      hintRef.current?.classList.add("is-hidden");
    };

    const lockScroll = () => {
      if (scrollLocked) return;
      scrollLocked = true;
      window.dispatchEvent(new Event("fw:video-play"));
    };

    const unlockScroll = () => {
      if (!scrollLocked) return;
      scrollLocked = false;
      window.dispatchEvent(new Event("fw:video-stop"));
    };

    const clampPos = (v: THREE.Vector3) => {
      v.x = THREE.MathUtils.clamp(v.x, -moveLimit, moveLimit);
      v.y = 0;
      v.z = THREE.MathUtils.clamp(v.z, -moveLimit, moveLimit);
      return v;
    };

    const setLook = (ny: number, np: number) => {
      targetYaw = fullYaw ? ny : THREE.MathUtils.clamp(ny, -yawMax, yawMax);
      targetPitch = THREE.MathUtils.clamp(np, -pitchMax, pitchMax);
    };

    const goTo = (p: RoomPosition) => {
      if (!allowWalk && p.id !== "center") return;
      clampPos(targetPos.set(p.x, p.y, p.z));
      if (typeof p.yaw === "number") {
        targetYaw = p.yaw;
        if (reduceMotion) yaw = p.yaw;
      }
      hideHint();
    };

    apiRef.current = { goTo };

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      renderer.domElement.setPointerCapture(e.pointerId);
      hideHint();
      lockScroll();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      setLook(targetYaw - dx * 0.0042, targetPitch - dy * 0.0034);
    };

    const endDrag = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      try {
        renderer.domElement.releasePointerCapture(e.pointerId);
      } catch {
        /* already released */
      }
      unlockScroll();
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      hideHint();
      if (allowWalk && (e.ctrlKey || e.metaKey)) {
        // Zoom-style: move forward/back in look direction
        const dir = new THREE.Vector3();
        camera.getWorldDirection(dir);
        dir.y = 0;
        dir.normalize();
        targetPos.addScaledVector(dir, -e.deltaY * 0.008);
        clampPos(targetPos);
        return;
      }
      setLook(targetYaw - e.deltaX * 0.0016, targetPitch - e.deltaY * 0.0016);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (!allowWalk) return;
      const k = e.key.toLowerCase();
      if (
        ["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(
          k,
        )
      ) {
        e.preventDefault();
        keys.add(k);
        hideHint();
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      keys.delete(e.key.toLowerCase());
    };

    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerup", endDrag);
    renderer.domElement.addEventListener("pointercancel", endDrag);
    renderer.domElement.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (w < 1 || h < 1) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    const forward = new THREE.Vector3();
    const right = new THREE.Vector3();

    let frame = 0;
    const tick = () => {
      frame = requestAnimationFrame(tick);
      const ease = reduceMotion ? 1 : 0.14;
      yaw += (targetYaw - yaw) * ease;
      pitch += (targetPitch - pitch) * ease;
      camera.rotation.y = yaw;
      camera.rotation.x = pitch;

      if (allowWalk && keys.size) {
        camera.getWorldDirection(forward);
        forward.y = 0;
        if (forward.lengthSq() > 0) forward.normalize();
        right.crossVectors(forward, camera.up).normalize();

        const speed = 0.11;
        if (keys.has("w") || keys.has("arrowup")) {
          targetPos.addScaledVector(forward, speed);
        }
        if (keys.has("s") || keys.has("arrowdown")) {
          targetPos.addScaledVector(forward, -speed);
        }
        if (keys.has("d") || keys.has("arrowright")) {
          targetPos.addScaledVector(right, speed);
        }
        if (keys.has("a") || keys.has("arrowleft")) {
          targetPos.addScaledVector(right, -speed);
        }
        clampPos(targetPos);
      }

      pos.lerp(targetPos, ease);
      camera.position.copy(pos);

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      disposed = true;
      apiRef.current = null;
      cancelAnimationFrame(frame);
      ro.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerup", endDrag);
      renderer.domElement.removeEventListener("pointercancel", endDrag);
      renderer.domElement.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      unlockScroll();
      room.traverse((obj) => {
        if (obj instanceof THREE.Mesh) obj.geometry?.dispose();
      });
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, [
    src,
    panorama,
    faces?.front,
    faces?.back,
    faces?.left,
    faces?.right,
    faces?.top,
    faces?.bottom,
  ]);

  const selectPosition = (p: RoomPosition) => {
    setActivePos(p.id);
    apiRef.current?.goTo(p);
  };

  const hint = canMove
    ? "Drag to look · pick a position or use WASD to walk"
    : "Drag to look around · from the center of the room";

  return (
    <div className={className ? `room-view3d ${className}` : "room-view3d"}>
      <div ref={hostRef} className="room-view3d-canvas" />
      <p ref={hintRef} className="room-view3d-hint">
        {hint}
      </p>

      {canMove && (
        <div className="room-view3d-controls" role="group" aria-label="Stand position">
          <span className="room-view3d-controls-label">Position</span>
          <div className="room-view3d-positions">
            {positions.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`room-view3d-pos${activePos === p.id ? " is-active" : ""}`}
                onClick={() => selectPosition(p)}
              >
                {p.label}
              </button>
            ))}
          </div>
          <p className="room-view3d-keys">
            Walk: WASD / arrows · Ctrl+scroll to step
          </p>
        </div>
      )}
    </div>
  );
}
