import { createRef, useCallback, useEffect } from "react";
import confetti from "canvas-confetti";

interface Props {
  width: number;
  height: number;
}

export default function Confetti(props: Props) {
  const ref = createRef<HTMLCanvasElement>();

  const createConfig = useCallback(() => {
    if (!ref.current) return;
    return confetti.create(ref.current);
  }, [ref]);

  const fire = (
    config: confetti.CreateTypes,
    particleRatio: number,
    opts: confetti.Options
  ) => {
    if (!config) return;
    config({
      origin: { y: 0.7 },
      particleCount: Math.floor(30 * particleRatio),
      ...opts,
    });
  };

  const open = (config: confetti.CreateTypes) => {
    fire(config, 0.25, {
      spread: 13,
      startVelocity: 55,
    });
    fire(config, 0.2, {
      spread: 30,
    });
    fire(config, 0.35, {
      spread: 50,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(config, 0.1, {
      spread: 60,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(config, 0.1, {
      spread: 60,
      startVelocity: 45,
    });
  };

  useEffect(() => {
    const config = createConfig();
    if (!config) return;
    open(config);
  }, []);

  return <canvas ref={ref} width={props.width} height={props.height}></canvas>;
}
