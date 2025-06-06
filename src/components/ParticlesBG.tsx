import React from 'react';
import Particles from 'react-tsparticles';
import { loadLinksPreset } from 'tsparticles-preset-links';
import type { Engine } from 'tsparticles-engine';

const ParticlesBG: React.FC = () => {
  const particlesInit = async (engine: Engine) => {
    await loadLinksPreset(engine);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        preset: 'links',
        background: {
          color: {
            value: 'transparent',
          },
        },
        fullScreen: { enable: true, zIndex: -1 },
        particles: {
          color: { value: '#888' },
          links: {
            color: '#888',
            distance: 120,
            enable: true,
            opacity: 0.4,
            width: 1,
          },
        },
      }}
    />
  );
};

export default ParticlesBG;
