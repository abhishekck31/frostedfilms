export function MeshGradientDivider() {
  return (
    <div className="relative h-[300px] w-full overflow-hidden pointer-events-none">
      <div 
        className="absolute left-0 top-1/2 w-3/5 h-full -translate-y-1/2"
        style={{
          background: 'radial-gradient(ellipse 60% 100% at 20% 50%, #EDE8F7 0%, transparent 70%)'
        }}
      />
      <div 
        className="absolute right-0 top-1/2 w-3/5 h-full -translate-y-1/2"
        style={{
          background: 'radial-gradient(ellipse 60% 100% at 80% 50%, #F4F0FA 0%, transparent 70%)'
        }}
      />
    </div>
  );
}
