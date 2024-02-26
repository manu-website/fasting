// fireworks.js

document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('fireworksCanvas');
    const ctx = canvas.getContext('2d');
    const fireworks = [];
  
    canvas.width = window.innerWidth - 50;
    canvas.height = window.innerHeight;
  
  // List of specific dates and times for fireworks
  const fireworksSchedule = [
    new Date('2024-02-26T17:59:00'),
    new Date('2024-03-01T18:53:00'),
    new Date('2024-03-02T18:54:00'),
    new Date('2024-03-03T18:56:00'),
    new Date('2024-03-04T18:57:00'),
    new Date('2024-03-05T18:58:00'),
    new Date('2024-03-06T18:59:00'),
    new Date('2024-03-07T19:00:00'),
    new Date('2024-03-08T19:01:00'),
    new Date('2024-03-09T19:02:00'),
    new Date('2024-03-10T19:03:00'),
    new Date('2024-03-11T19:04:00'),
    new Date('2024-03-12T19:05:00'),
    new Date('2024-03-13T19:06:00'),
    new Date('2024-03-14T19:07:00'),
    new Date('2024-03-15T19:09:00'),
    new Date('2024-03-16T19:10:00'),
    new Date('2024-03-17T19:11:00'),
    new Date('2024-03-18T19:12:00'),
    new Date('2024-03-19T19:13:00'),

    // Add more dates and times as needed
  ];

    //const fireworksDuration = 300000; // 5 minutes in milliseconds
    const fireworksDurationInMinutes = 120;
    const fireworksDuration = fireworksDurationInMinutes * 60000;

    function createFirework() {
      const firework = {
          x: Math.random() * canvas.width,
          y: 0, // Start from the top of the page
          color: `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`,
          radius: 2,
          velocity: {
            x: (Math.random() - 0.5) * 8,
            y: Math.random() * 6 + 3 // Adjust the upward velocity
          },
          particles: []
        };

        for (let i = 0; i < 50; i++) {
          firework.particles.push({
            x: firework.x,
            y: firework.y,
            color: firework.color,
            radius: 2,
            velocity: {
              x: (Math.random() - 0.5) * 4,
              y: (Math.random() - 0.5) * 4
            },
            alpha: 1
          });
        }

        fireworks.push(firework);
    }
  
    function update() {
        fireworks.forEach((firework, index) => {
            firework.x += firework.velocity.x;
            firework.y += firework.velocity.y;
            firework.velocity.y += 0.1;
  
            if (firework.y <= firework.radius) {
              fireworks.splice(index, 1);
              explode(firework);
            }
          });
  
          fireworks.forEach((firework) => {
            firework.particles.forEach((particle, particleIndex) => {
              particle.x += particle.velocity.x;
              particle.y += particle.velocity.y;
              particle.velocity.y += 0.1;
              particle.alpha -= 0.02;
  
              if (particle.alpha <= 0) {
                firework.particles.splice(particleIndex, 1);
              }
            });
          });
    }
  
    function explode(firework) {
        for (let i = 0; i < 100; i++) {
            firework.particles.push({
              x: firework.x,
              y: firework.y,
              color: firework.color,
              radius: 2,
              velocity: {
                x: Math.cos((Math.PI * 2) / 100 * i) * (Math.random() * 4 + 2),
                y: Math.sin((Math.PI * 2) / 100 * i) * (Math.random() * 4 + 2)
              },
              alpha: 1
            });
          }
    }
  
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        fireworks.forEach((firework) => {
          ctx.beginPath();
          ctx.arc(firework.x, firework.y, firework.radius, 0, Math.PI * 2);
          ctx.fillStyle = firework.color;
          ctx.fill();
        });

        fireworks.forEach((firework) => {
          firework.particles.forEach((particle) => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.globalAlpha = particle.alpha;
            ctx.fill();
            ctx.globalAlpha = 1;
          });
        });
    }

    function initiateFireworks() {
      // Check if the current time is within the specified range
      const currentTime = new Date().getTime();
  
      for (const scheduledTime of fireworksSchedule) {
        const scheduledTimestamp = scheduledTime.getTime();
  
        if (currentTime >= scheduledTimestamp && currentTime <= scheduledTimestamp + fireworksDuration) {
          createFirework();
  
          // Set a timeout to stop the fireworks display after the specified duration
          setTimeout(() => {
            fireworks.length = 0; // Clear the fireworks array
          }, fireworksDuration);
  
          break; // Stop checking after triggering fireworks for one scheduled time
        }
      }
    }
  
    function animate() {
      initiateFireworks(); // Check the time before creating fireworks
      update();
      draw();
      requestAnimationFrame(animate);
    }
  
    animate();
  
    window.addEventListener('resize', function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  });
  
