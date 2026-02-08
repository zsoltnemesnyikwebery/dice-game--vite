const GradientBackground = ({colors}: {colors: [string, string]}) => {
  return (
    <div 
        className="fixed w-screen h-screen inset-0 overflow-hidden"
        style={{
            background: `linear-gradient(135deg, ${colors[0]}, rgba(255,255,255,.5), ${colors[1]})`
        }}
    >
        <span 
            className="absolute left-[20%] top-[10%] h-[70vh] w-[70vh] origin-center animate-blob rounded-full blur-[50px]"
            style={{
                background: `linear-gradient(135deg, ${colors[0]}, rgba(255,255,255,.5), ${colors[1]})`
            }} 
        />
        <span 
            className="absolute left-[40%] top-[30%] h-[70vh] w-[70vh] origin-center animate-blob-reverse rounded-full blur-[50px]"
            style={{
                background: `linear-gradient(135deg, ${colors[0]}, rgba(255,255,255,.5), ${colors[1]})`
            }} 
        />

    </div>
  )
}
export default GradientBackground