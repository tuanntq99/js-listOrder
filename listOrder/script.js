/* Create and Search button */

const triggerDiv = document.createElement('div');
triggerDiv.classList.add('trigger-div');

const createContainer = document.createElement('div');
createContainer.classList.add('create-container');

const createNew = document.createElement('button');
createNew.classList.add('btn-create');
createNew.textContent = 'Create New';

const searchContainerDiv = document.createElement('div');
searchContainerDiv.classList.add('search-container');

const searchInput = document.createElement('input');
searchInput.classList.add('search-item');
searchInput.setAttribute('type', 'text');
searchInput.setAttribute('id', 'input-search');

const searchButton = document.createElement('button');
searchButton.classList.add('btn-search');
searchButton.textContent = 'Search';

createContainer.appendChild(createNew);

searchContainerDiv.appendChild(searchInput);
searchContainerDiv.appendChild(searchButton);

triggerDiv.appendChild(createContainer);
triggerDiv.appendChild(searchContainerDiv);

const tblOrderDiv = document.getElementById('tbl-order');

tblOrderDiv.parentElement.insertBefore(triggerDiv, tblOrderDiv);

/* Open table data */

// Chọn phần tử #detail-course-modal
const detailCourseModal = document.getElementById('detail-course-modal');

createNew.addEventListener('click', e => {

    resetCheckFields();

    // Thêm CSS vào #detail-course-modal
    detailCourseModal.style.display = 'block';
    detailCourseModal.style.opacity = '1';

    detailCourseModal.mode = 'create';

});

/* Create new data */

const listOrder = [];
let curIndex;
document.getElementById('btn-confirm').addEventListener('click', () => {
    const mode = detailCourseModal.mode;
    if (mode === 'create') {

        updateDateTime('input-ngay-tao');
        updateDateTime('input-ngay-cap-nhat');

        const orderCode = document.getElementById('input-orderCode').value;
        const combo = document.getElementById('input-combo').value;
        const duongKinh = document.getElementById('input-duong-kinh').value;
        const suon = document.getElementById('input-suon').value;
        const drink = document.getElementById('input-drink').value;
        const drinkNumber = document.getElementById('input-drink-number').value;
        const voucherId = document.getElementById('input-voucherid').value;
        const pizza = document.getElementById('input-pizza').value;
        const salad = document.getElementById('input-salad').value;
        const tien = document.getElementById('input-tien').value;
        const giamGia = document.getElementById('input-giam-gia').value;
        const hoTen = document.getElementById('input-ho-ten').value;
        const email = document.getElementById('input-email').value;
        const sdt = document.getElementById('input-so-dien-thoai').value;
        const diaChi = document.getElementById('input-dia-chi').value;
        const message = document.getElementById('input-message').value;
        const trangThai = document.getElementById('input-trang-thai').value;
        const ngayTao = document.getElementById('input-ngay-tao').value;
        const ngayUpdate = document.getElementById('input-ngay-cap-nhat').value;

        checkFields();

        if (!checkFields()) {
            // Xóa CSS tại #detail-course-modal
            detailCourseModal.style.display = 'none';
            detailCourseModal.style.opacity = '0';

            const input = { orderCode, combo, duongKinh, suon, drink, drinkNumber, voucherId, pizza, salad, tien, giamGia, hoTen, email, sdt, diaChi, message, trangThai, ngayTao, ngayUpdate };

            listOrder.push(input);
            console.log(input);
            console.log(listOrder);

            listOrder.forEach((order, index) => {
                order.orderCode = index + 1;
            });

            resetModal();
            renderHTML(listOrder);
        } else {
            //Erase date if blank information
            document.getElementById('input-ngay-tao').value = '';
            document.getElementById('input-ngay-cap-nhat').value = '';
        }

        renderPage(currentPage); // Sang page khi đã đủ object trên 1 page

    } else if (mode === 'edit') {
        // Đang ở chế độ chỉnh sửa
        console.log(detailCourseModal.mode)
        
        const order = listOrder[curIndex];

        checkFields();
        if (!checkFields()) {
            console.log('Edit success!!', curIndex);
            updateDateTime('input-ngay-cap-nhat');

            order.orderCode = document.getElementById('input-orderCode').value;
            order.combo = document.getElementById('input-combo').value;
            order.duongKinh = document.getElementById('input-duong-kinh').value;
            order.suon = document.getElementById('input-suon').value;
            order.drink = document.getElementById('input-drink').value;
            order.drinkNumber = document.getElementById('input-drink-number').value;
            order.voucherId = document.getElementById('input-voucherid').value;
            order.pizza = document.getElementById('input-pizza').value;
            order.salad = document.getElementById('input-salad').value;
            order.tien = document.getElementById('input-tien').value;
            order.giamGia = document.getElementById('input-giam-gia').value;
            order.hoTen = document.getElementById('input-ho-ten').value;
            order.email = document.getElementById('input-email').value;
            order.sdt = document.getElementById('input-so-dien-thoai').value;
            order.diaChi = document.getElementById('input-dia-chi').value;
            order.message = document.getElementById('input-message').value;
            order.trangThai = document.getElementById('input-trang-thai').value;
            order.ngayTao = document.getElementById('input-ngay-tao').value;
            order.ngayUpdate = document.getElementById('input-ngay-cap-nhat').value;

            // Xóa CSS tại #detail-course-modal
            detailCourseModal.style.display = 'none';
            detailCourseModal.style.opacity = '0';

            resetModal();
            renderHTML(listOrder);
            alert('Dữ liệu đã được cập nhật.');

        }

        renderPage(currentPage); // Update page khi edit lại 1 object

    }

});

const resetCheckFields = () => {
    const allFields = ['combo', 'drink', 'pizza', 'tien', 'ho-ten', 'so-dien-thoai', 'trang-thai'];
    for (const field of allFields) {
        const errorElement = document.getElementById(`error-${field}`);
        errorElement.textContent = '';
        errorElement.textContent = '';
    }
}

/* Check Blank information */

const checkFields = () => {
    let isBlank = false;
    const allFields = ['combo', 'drink', 'pizza', 'tien', 'ho-ten', 'so-dien-thoai', 'trang-thai'];
    for (const field of allFields) {
        const inputElement = document.getElementById(`input-${field}`);
        const errorElement = document.getElementById(`error-${field}`);
        if (inputElement.tagName === 'SELECT') {
            if (inputElement.value === '') {
                errorElement.textContent = 'Vui lòng chọn option.';
                isBlank = true;
            } else {
                errorElement.textContent = '';
            }
        } else {
            if (inputElement.value === '') {
                errorElement.textContent = 'Vui lòng điền đầy đủ thông tin.';
                isBlank = true;
            } else {
                errorElement.textContent = '';
            }
        }
    }

    return isBlank;
}

let renderHTML = (list) => {
    let html = list.map((order, index) => {
        return `
        <tr>
        <th scope="col">${order.orderCode}</th>
        <th scope="col">${order.combo}</th>
        <th scope="col">${order.pizza}</th>
        <th scope="col">${order.drink}</th>
        <th scope="col">${order.tien}</th>
        <th scope="col">${order.hoTen}</th>
        <th scope="col">${order.sdt}</th>
        <th scope="col">${order.trangThai}</th>
        <th scope="col" class="detail">
            <div class="btn-container">
                <div class="detail-container">
                    <button class="btn-detail" data-index="${index}">Chi tiết</button>
                </div>
                <div class="erase-container">
                    <button class="btn-erase" data-index="${index}">Xóa</button>
                </div>
        </th>
    </tr>     
    `
    }).join("");
    document.getElementById("tbody").innerHTML = html;
    updatePaginationButtons();

}

/* Delete button */

document.addEventListener('click', (event) => {
    let erasePerformed = false;
    if (event.target.classList.contains('btn-erase')) {
        const index = parseInt(event.target.dataset.index);

        document.querySelector('.modal-confirm-erase').style.opacity = '1';
        document.querySelector('.modal-confirm-erase').style.display = 'flex';

        document.querySelector('#btn-confirm-erase').addEventListener('click', () => {
            if (!erasePerformed) {
                console.log('Erase success!!', index);

                // Xóa order tương ứng trong listOrder
                listOrder.splice(index, 1);

                document.querySelector('.modal-confirm-erase').style.opacity = '0';
                document.querySelector('.modal-confirm-erase').style.display = 'none';
                // Cập nhật orderCode cho các đối tượng còn lại
                listOrder.forEach((order, index) => {
                    order.orderCode = index + 1;
                });

                // Gọi lại renderHTML để cập nhật giao diện
                renderHTML(listOrder);
                console.log(listOrder);
                erasePerformed = true;

            };
        });

        document.querySelector('#btn-cancel-erase').addEventListener('click', () => {

            document.querySelector('.modal-confirm-erase').style.opacity = '0';
            document.querySelector('.modal-confirm-erase').style.display = 'none';
            erasePerformed = true;

        });
    }
});

/* Edit data */

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-detail')) {
        const index = event.target.dataset.index;
        curIndex = index;

        resetCheckFields();

        const order = listOrder[index];
        console.log(order);

        // lấy giá trị ở index hiện tại
        document.getElementById('input-orderCode').value = order.orderCode;
        document.getElementById('input-combo').value = order.combo;
        document.getElementById('input-duong-kinh').value = order.duongKinh;
        document.getElementById('input-suon').value = order.suon;
        document.getElementById('input-drink').value = order.drink;
        document.getElementById('input-drink-number').value = order.drinkNumber;
        document.getElementById('input-voucherid').value = order.voucherId;
        document.getElementById('input-pizza').value = order.pizza;
        document.getElementById('input-salad').value = order.salad;
        document.getElementById('input-tien').value = order.tien;
        document.getElementById('input-giam-gia').value = order.giamGia;
        document.getElementById('input-ho-ten').value = order.hoTen;
        document.getElementById('input-email').value = order.email;
        document.getElementById('input-so-dien-thoai').value = order.sdt;
        document.getElementById('input-dia-chi').value = order.diaChi;
        document.getElementById('input-message').value = order.message;
        document.getElementById('input-trang-thai').value = order.trangThai;
        document.getElementById('input-ngay-tao').value = order.ngayTao;
        document.getElementById('input-ngay-cap-nhat').value = order.ngayUpdate;

        detailCourseModal.mode = 'edit';

        //Visivle Form
        detailCourseModal.style.display = 'block';
        detailCourseModal.style.opacity = '1';
    }
});

const resetModal = () => {

    // Để xóa giá trị của input sau khi đã thêm vào danh sách:
    document.getElementById('input-orderCode').value = '';
    document.getElementById('input-combo').value = '';
    document.getElementById('input-duong-kinh').value = '';
    document.getElementById('input-suon').value = '';
    document.getElementById('input-drink').value = '';
    document.getElementById('input-drink-number').value = '';
    document.getElementById('input-voucherid').value = '';
    document.getElementById('input-pizza').value = '';
    document.getElementById('input-salad').value = '';
    document.getElementById('input-tien').value = '';
    document.getElementById('input-giam-gia').value = '';
    document.getElementById('input-ho-ten').value = '';
    document.getElementById('input-email').value = '';
    document.getElementById('input-so-dien-thoai').value = '';
    document.getElementById('input-dia-chi').value = '';
    document.getElementById('input-message').value = '';
    document.getElementById('input-trang-thai').value = '';
    document.getElementById('input-ngay-tao').value = '';
    document.getElementById('input-ngay-cap-nhat').value = '';
};

/* Close button */

const closeButton = document.querySelector('.close');
closeButton.addEventListener('click', () => {
    detailCourseModal.style.display = 'none';
    detailCourseModal.style.opacity = '0';
    resetModal();
});

/* Cancel button */

const cancelButton = document.querySelector('#btn-cancel');
cancelButton.addEventListener('click', () => {
    detailCourseModal.style.display = 'none';
    detailCourseModal.style.opacity = '0';
    resetModal();
});

/* Filter button */

document.getElementById('btn-filter').addEventListener('click', () => {
    const selectStatus = document.querySelector('#select-status').value;
    const selectPizza = document.querySelector('#select-pizza').value;

    let filteredOrders = [];

    if (selectStatus !== 'all') {
        filteredOrders = listOrder.filter(order => {
            const orderStatus = order.trangThai.toLowerCase(); // Convert to lowercase
            return orderStatus === selectStatus;
        });
    }

    if (selectPizza !== 'all') {
        filteredOrders = listOrder.filter(order => {
            const orderPizza = order.pizza.toLowerCase(); // Convert to lowercase
            return orderPizza === selectPizza;
        });
    }

    // filteredOrders.forEach((order, index) => {
    //     order.orderCode = index + 1;
    // });

    renderHTML(filteredOrders);

});
// Note: querySelector.value sẽ ra lower string

/* Search button */

document.querySelector('.btn-search').addEventListener('click', () => {
    const searchValue = document.querySelector('#input-search').value.toLowerCase();

    const filteredOrders = listOrder.filter(order => {
        const orderStatus = order.hoTen.toLowerCase();

        return orderStatus.includes(searchValue);
    });

    // filteredOrders.forEach((order, index) => {
    //     order.orderCode = index + 1;
    // });

    renderHTML(filteredOrders);

});

/* Page */

// Số lượng mục hiển thị trên mỗi trang
let ITEMS_PER_PAGE = parseInt(document.getElementById('items-per-page').value) || 10000;

document.getElementById('items-per-page').addEventListener('input', function () {
    ITEMS_PER_PAGE = parseInt(this.value) || 10000;
    currentPage = 1; // Reset lại trang về 1 khi số lượng mục trên mỗi trang thay đổi
    renderPage(currentPage);
    updatePaginationButtons();
});

let currentPage = 1; // Trang hiện tại

function renderPage(page) {
    const startIdx = (page - 1) * ITEMS_PER_PAGE;
    const endIdx = startIdx + ITEMS_PER_PAGE;
    const ordersOnPage = listOrder.slice(startIdx, endIdx);

    renderHTML(ordersOnPage);

    const totalPages = Math.ceil(listOrder.length / ITEMS_PER_PAGE);
    const currentPageInfo = document.getElementById('current-page-info');
    currentPageInfo.textContent = `Trang ${currentPage} / ${totalPages}`;
}

function updatePaginationButtons() {
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');

    prevPageButton.classList.toggle('disabled', currentPage === 1);
    nextPageButton.classList.toggle('disabled', currentPage === Math.ceil(listOrder.length / ITEMS_PER_PAGE));

    const totalPages = Math.ceil(listOrder.length / ITEMS_PER_PAGE);
    document.getElementById('current-page-info').textContent = `Trang ${currentPage} / ${totalPages}`;
}

/* Fix button prev and next (just fun) */

function removeClickedClass() {
    document.getElementById('next-page').classList.remove('button-clicked');
    document.getElementById('prev-page').classList.remove('button-clicked');
}

document.getElementById('prev-page').addEventListener('click', e => {
    e.preventDefault(); // pevendefault() ngăn trang web chuyển đổi hoặc làm lại khi nút được click, ngăn sự kiện mặc định của trình duyệt xảy ra
    if (currentPage > 1) {
        currentPage--;
        renderPage(currentPage);
        updatePaginationButtons();
    }

    document.getElementById('prev-page').classList.add('button-clicked');
    setTimeout(removeClickedClass, 300);

    document.activeElement.blur();

});

document.getElementById('next-page').addEventListener('click', e => {
    e.preventDefault();
    if (currentPage < Math.ceil(listOrder.length / ITEMS_PER_PAGE)) {
        currentPage++;
        renderPage(currentPage);
        updatePaginationButtons();
    }

    document.getElementById('next-page').classList.add('button-clicked');
    setTimeout(removeClickedClass, 300);

    document.activeElement.blur();

});

// Đối tượng mới được tạo, kiểm tra nếu đối tượng mới là đối tượng thứ 6
if (listOrder.length % ITEMS_PER_PAGE === 0 && listOrder.length > 0) {
    currentPage = Math.ceil(listOrder.length / ITEMS_PER_PAGE);
}

renderPage(currentPage); // Để hiển thị trang đầu tiên khi tải trang


// Cần gọi hàm `renderPage` trong nhiều trường hợp, ví dụ:
// - Sau khi tải dữ liệu ban đầu
// - Sau khi thực hiện tìm kiếm hoặc lọc
// - Khi bất kỳ thay đổi nào xảy ra có thể ảnh hưởng đến dữ liệu
//   (ví dụ: thêm mới, xóa, chỉnh sửa đơn hàng)


/* Fix a little */

function restrictToDigits(inputId) {
    document.getElementById(inputId).addEventListener('input', function () {
        let value = this.value.replace(/[^\d]/g, ''); // Chỉ giữ lại các ký tự số
        if (inputId === 'input-drink-number') {
            value = value.slice(0, 3); // Giới hạn độ dài chuỗi số tối đa là 3
        }
        if (inputId === 'input-so-dien-thoai') {
            value = value.slice(0, 10); // Giới hạn độ dài chuỗi số tối đa là 10
        }
        this.value = value;
    });
};

restrictToDigits('input-orderCode');
restrictToDigits('input-drink-number');
restrictToDigits('input-voucherid');
restrictToDigits('input-tien');
restrictToDigits('input-so-dien-thoai');


// Fix date: Auto update time in UpdateDay

function updateDateTime(inputType) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const dateTimeString = `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;

    document.getElementById(`${inputType}`).value = dateTimeString;
}

// Clear button

document.querySelector('#btn-clear').addEventListener('click', () => {
    document.querySelector('#select-status').value = 'all';
    document.querySelector('#select-pizza').value = 'all';
    document.querySelector('#input-search').value ='';
    renderHTML(listOrder);
});




