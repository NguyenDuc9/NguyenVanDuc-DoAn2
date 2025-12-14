// Chuyển trang khi click vào sidebar
const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
    const page = item.dataset.page;
    if (page !== "index.html") {
      window.location.href = page;
    }
  });
});

// Lấy dữ liệu từ localStorage và hiển thị tổng số
function loadStats() {
  const hoa = JSON.parse(localStorage.getItem("hoa") || "[]");
  const danhMuc = JSON.parse(localStorage.getItem("danhmuc") || "[]");
  const daBan = JSON.parse(localStorage.getItem("daban") || "[]");
  const km = JSON.parse(localStorage.getItem("khuyenmai") || "[]");

  document.getElementById("totalHoa").innerText = hoa.length;
  document.getElementById("totalDanhMuc").innerText = danhMuc.length;
  document.getElementById("totalDaBan").innerText = daBan.length;
  document.getElementById("totalKM").innerText = km.length;
}

loadStats();
