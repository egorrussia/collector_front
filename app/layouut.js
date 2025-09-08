// app/layout.js
export default function Layout({ children }) {
  return (
    <html lang="ru">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        <div className="bg-red-500 p-4 text-white">
          Тест Tailwind CDN
        </div>
        {children}
      </body>
    </html>
  )
}