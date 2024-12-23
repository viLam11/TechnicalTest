export default {
    content: [
        "./src/**/*.jsx"
    ], 
    theme: {
        extend: {
          textIndent: {
            'none': '0px',
            'sm': '10px', // Khoảng cách nhỏ
            'md': '20px', // Khoảng cách trung bình
            'lg': '30px', // Khoảng cách lớn
          },
        },
      },
      plugins: [
        require('tailwindcss-text-indent'), // Plugin hỗ trợ text-indent
      ],
}