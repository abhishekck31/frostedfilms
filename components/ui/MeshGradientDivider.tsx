export function MeshGradientDivider() {
  return (
    <div className="absolute top-0 left-0 w-full h-[300px] pointer-events-none -translate-y-1/2 overflow-hidden z-[-1]">
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
