$(document).ready(function() {
    $(".button-collapse").sideNav();
    var rows = document.getElementsByClassName('data-row');
    readData = function() {
        //alert(rows);
        var data = [];
        for (var i = 0; i < rows.length; i++) {
            var row = rows.item(i);
            var cells = row.cells;
            var cellInfo = [];
            for (var j = 0; j < cells.length; j++) {
                cellInfo.push(cells.item(j).innerText);
            }
            //console.log(aRowOfData);
            data.push(cellInfo);
            //console.log(cells.length);
        }
        return data;
    };
    var arr = [];
    arr = readData();
    var isDeleteMode = false;

    function arraysEqual(a1, a2) {
        return JSON.stringify(a1) == JSON.stringify(a2);
    }
    // cac ham update sua o day
    function onUpdatingDemand(row) {
        if ($('a.btn-edit').is('#edit-kh')) {
            var data = {};
            data.row = JSON.stringify(row);
            $.post("/editkh", data, function(data, status) {
                //  client handler methods;
                // after successed 
            });
        } else if ($('a.btn-edit').is('#edit-loaisp')) {
            var data = {};
            data.row = JSON.stringify(row);
            $.post("/editloaisp", data, function(data, status) {
                //  client handler methods;
                // after successed 
            });
        } else {
            return;
        };
    };

    $('a.btn-edit').click(function() {
        var updatedData = readData();
        var itemchanged = 0;
        for (i = 0; i < updatedData.length; i++) {
            var updated_item = updatedData[i];
            // updated_item co dang : ["14", "Lê Tấn An", "anlt@gmail.com"];
            //console.log(updatedData[i]);
            loop2: for (j = 0; j < arr.length; j++) {
                var item = arr[i];
                // item co dang : ["14", "Lê Tấn An", ""];
                if (updated_item[0] === item[0]) {
                    if (!arraysEqual(updated_item, item)) {
                        //console.log('da co thay doi');
                        onUpdatingDemand(updated_item);
                        itemchanged++;
                    };
                    break loop2;
                };
            };
        };
        if (itemchanged > 0) {
            Materialize.toast('Sửa thành công ' + itemchanged + ' thay đổi!', 2000);
        } else {
            Materialize.toast('Không có thay đổi!', 2000);
        };
        location.reload(true);
    });

    var selectedRows;
    $('a.btn-delete').click(function() {
        isUpdatingMode = false;
        $('a.btn-update').text('Cập nhật');
        selectedRows = [];
        if (!isDeleteMode) {
            $('tr.data-row td.item-dtcontent').attr("contenteditable", 'false');
            $('a.btn-delete').text('Đồng ý');
            isDeleteMode = true;
        } else {
            $('tr.data-row td.item-dtcontent').attr("contenteditable", 'true');
            // javascript
            $('a.btn-delete').innerHTML = 'xóa';
            $('tr.data-row.isChecked').each(function() {
                var x = this.cells.item(0).innerText;
                selectedRows.push(x);
            });
            if (selectedRows.length === 0) {
                $(this).text('Xóa');
                isDeleteMode = false;
                return;
            }
            var data = {};
            data.selectedRows = JSON.stringify(selectedRows);

            if ($(this).is('#delete-kh')) {
                //alert('true');
                $.post("/deletekh", data, function(data, status) {
                    //  client handler methods;
                    // after successed    
                });

            } else if ($(this).is('#delete-loaisp')) {
                $.post("/deleteloaisp", data, function(data, status) {
                    //  client handler methods;
                    // after successed    
                });
            } else if ($(this).is('#delete-sp')) {
                $.post("/deletesp", data, function(data, status) {
                    //  client handler methods;
                    // after successed    
                });
            } else if ($(this).is('#delete-hoadon')) {
                $.post("/deletehoadon", data, function(data, status) {
                    //  client handler methods;
                    // after successed    
                });
            } else if ($(this).is('#delete-cthoadon')) {
                $.post("/delete-cthoadon", data, function(data, status) {
                    //  client handler methods;
                    // after successed    
                });
            } else {
                return;
            };
            Materialize.toast('Xóa thành công ' + selectedRows.length + ' dòng!', 2000);
            location.reload(true);
        }
    });

    var updatingRow = [];

    function fillRowData() {
        if ($('a.btn-update').is('#update-sp')) {
            //console.log(updatingRow);
            // updatingRow co dang :
            // ["36", "Phở bò", "Thực phẩm", "25000"]
            var tensp = updatingRow[1];
            var loaisp = updatingRow[2];
            var giasp = updatingRow[3];
            $('#input-tensp').val(tensp);
            $("#select-loaisp option").filter(function() {
                return $(this).text() == loaisp;
            }).prop('selected', true);
            $('#input-dongia').val(giasp);
        } else if ($('a.btn-update').is('#update-hoadon')) {
            //console.log(updatingRow);
            // updatingRow co dang :
            // ["13", "Đoàn Văn Toàn", "2016-07-04", ""]
            var ten = updatingRow[1];
            var thoigian = updatingRow[2];
            $("#select-ten option").filter(function() {
                return $(this).text() == ten;
            }).prop('selected', true);
            $('#input-thoigian').val(thoigian);
        } else if ($('a.btn-update').is('#update-cthoadon')) {
            //console.log(updatingRow);
            // updatingRow co dang :
            // ["5", "6", "Phở bò", "3", ""]
            var idhoadon = updatingRow[1];
            var tensp = updatingRow[2];
            var soluong = updatingRow[3];
            $('#select-idhoadon').val(idhoadon);
            $("#select-tensp option").filter(function() {
                return $(this).text() == tensp;
            }).prop('selected', true);
            $('#input-soluong').val(soluong);
            /**/
        } else {};
    };
    $('tr.data-row').click(function() {
        if (isDeleteMode) {
            //alert(isDeleteMode);    
            if ($(this).hasClass('isChecked')) {
                $(this).removeClass('isChecked');
            } else {
                $(this).addClass('isChecked');
            }
        };
        if (isUpdatingMode) {
            updatingRow = [];
            var cells = this.cells;
            for (i = 0; i < cells.length; i++) {
                updatingRow.push(cells.item(i).innerHTML);
            }
            fillRowData();
        };
    });
    // cap nhat cho routers sanpham, hoadon, chi tiet hoa don
    var isUpdatingMode = false;
    $('a.btn-update').click(function() {
        //alert();
        isDeleteMode = false;
        $('a.btn-delete').text('Xóa');
        if (isUpdatingMode) {
            if ($(this).is('#update-sp')) {
                //alert();
                var data = {};
                var updatingItem = {
                    idsanpham: updatingRow[0],
                    tensp: $('#input-tensp').val(),
                    idloaisp: $('#select-loaisp').val(),
                    dongia: $('#input-dongia').val(),
                };
                data.updatedRow = JSON.stringify(updatingItem);
                //console.log(JSON.stringify(updatingItem));

                $.post("/updatesp", data, function(data, status) {
                    //  client handler methods;
                    // after successed 
                });
                /**/
            } else if ($(this).is('#update-hoadon')) {
                //alert();                
                var data = {};
                var updatingItem = {
                    idhoadon: updatingRow[0],
                    idkhachhang: $('#select-ten').val(),
                    thoigian: $('#input-thoigian').val(),
                };
                data.updatedRow = JSON.stringify(updatingItem);
                //console.log(JSON.stringify(updatingItem));
                $.post("/updatehoadon", data, function(data, status) {
                    //  client handler methods;
                    // after successed 
                });
                /**/
            } else if ($(this).is('#update-cthoadon')) {
                //alert();                
                var data = {};
                var updatingItem = {
                    idchitiethoadon: updatingRow[0],
                    idhoadon: $('#select-idhoadon').val(),
                    idsanpham: $('#select-tensp').val(),
                    soluong: $('#input-soluong').val(),
                };
                data.updatedRow = JSON.stringify(updatingItem);
                //console.log(JSON.stringify(updatingItem));
                $.post("/update-cthoadon", data, function(data, status) {
                    //  client handler methods;
                    // after successed 
                });
                /**/
            } else {};
            Materialize.toast('Cập nhật thành công!', 2000);
            location.reload(true);
        } else {
            $('a.btn-update').text('Đồng ý');
            isUpdatingMode = true;
        };
    });

})