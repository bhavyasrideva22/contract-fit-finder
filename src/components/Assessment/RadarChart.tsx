import { useEffect, useRef } from 'react';

interface RadarChartProps {
  scores: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    reality: number;
  };
}

export const RadarChart = ({ scores }: RadarChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size for high DPI displays
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = Math.min(centerX, centerY) - 60;

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Draw grid circles
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 5; i++) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, (radius * i) / 5, 0, 2 * Math.PI);
      ctx.stroke();
    }

    // Labels and data
    const labels = ['Will', 'Interest', 'Skill', 'Cognitive', 'Ability', 'Reality'];
    const dataKeys = ['will', 'interest', 'skill', 'cognitive', 'ability', 'reality'] as const;
    const data = dataKeys.map(key => scores[key]);

    // Draw axes
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    labels.forEach((_, index) => {
      const angle = (index * 2 * Math.PI) / labels.length - Math.PI / 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();
    });

    // Draw data polygon
    ctx.beginPath();
    ctx.strokeStyle = '#3b82f6';
    ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
    ctx.lineWidth = 2;

    data.forEach((value, index) => {
      const angle = (index * 2 * Math.PI) / data.length - Math.PI / 2;
      const distance = (value / 100) * radius;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw data points
    ctx.fillStyle = '#1d4ed8';
    data.forEach((value, index) => {
      const angle = (index * 2 * Math.PI) / data.length - Math.PI / 2;
      const distance = (value / 100) * radius;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Draw labels
    ctx.fillStyle = '#475569';
    ctx.font = '14px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    labels.forEach((label, index) => {
      const angle = (index * 2 * Math.PI) / labels.length - Math.PI / 2;
      const labelDistance = radius + 30;
      const x = centerX + Math.cos(angle) * labelDistance;
      const y = centerY + Math.sin(angle) * labelDistance;
      
      ctx.fillText(label, x, y);
      
      // Draw score
      ctx.font = '12px Inter, sans-serif';
      ctx.fillStyle = '#6b7280';
      ctx.fillText(`${data[index]}`, x, y + 16);
      ctx.font = '14px Inter, sans-serif';
      ctx.fillStyle = '#475569';
    });

  }, [scores]);

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="w-full max-w-md h-80"
        style={{ width: '400px', height: '400px' }}
      />
      <div className="mt-6 grid grid-cols-3 gap-4 text-sm text-center max-w-lg">
        <div>
          <div className="font-medium text-foreground">Will</div>
          <div className="text-muted-foreground">Perseverance & Grit</div>
        </div>
        <div>
          <div className="font-medium text-foreground">Interest</div>
          <div className="text-muted-foreground">Role Motivation</div>
        </div>
        <div>
          <div className="font-medium text-foreground">Skill</div>
          <div className="text-muted-foreground">Current Abilities</div>
        </div>
        <div>
          <div className="font-medium text-foreground">Cognitive</div>
          <div className="text-muted-foreground">Problem Solving</div>
        </div>
        <div>
          <div className="font-medium text-foreground">Ability</div>
          <div className="text-muted-foreground">Learning Readiness</div>
        </div>
        <div>
          <div className="font-medium text-foreground">Reality</div>
          <div className="text-muted-foreground">Career Fit</div>
        </div>
      </div>
    </div>
  );
};