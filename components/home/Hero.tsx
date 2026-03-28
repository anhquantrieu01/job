export default async function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-green-600 via-emerald-500 to-green-700 py-28 text-white">

      {/* Glow background */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-green-400/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-emerald-300/30 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 text-center">

        {/* Badge */}
        <div className="inline-block mb-6 px-4 py-1 rounded-full bg-white/20 text-sm backdrop-blur">
          🚀 Nền tảng tuyển dụng hiện đại
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
          Tìm công việc{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-200 to-white">
            mơ ước
          </span>{" "}
          của bạn
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg md:text-xl text-green-100 max-w-2xl mx-auto leading-relaxed">
          Hàng ngàn cơ hội việc làm chất lượng từ các công ty hàng đầu, 
          giúp bạn phát triển sự nghiệp nhanh hơn bao giờ hết.
        </p>

      
      </div>
    </section>
  )
}