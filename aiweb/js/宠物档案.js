// 等整个页面DOM全部加载完毕再执行代码
document.addEventListener('DOMContentLoaded', function () {
    const mask = document.getElementById('mask');
    const addPetBtn = document.getElementById('addPetBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const submitBtn = document.getElementById('submitBtn');
    const petWrap = document.getElementById('petWrap');
    const formTitle = document.getElementById('formTitle');
    const avatarInput = document.getElementById('avatarInput');

    const petName = document.getElementById('petName');
    const petBreed = document.getElementById('petBreed');
    const petBirth = document.getElementById('petBirth');
    const petGender = document.getElementById('petGender');
    const petWeight = document.getElementById('petWeight');

    let editIndex = null;
    let currentAvatarIndex = null;
    let petList = JSON.parse(localStorage.getItem('petData')) || [];

    // 挂载到window，给html里onclick调用！重点！
    window.delPet = function(index){
        petList.splice(index,1);
        saveData();
        renderList();
    }
    window.editPet = function(index){
        editIndex = index;
        formTitle.innerText = '修改宠物信息';
        const item = petList[index];
        petName.value = item.name;
        petBreed.value = item.breed;
        petBirth.value = item.birth;
        petGender.value = item.gender;
        petWeight.value = item.weight;
        mask.style.display = 'flex';
    }
    window.changeAvatar = function(index){
        currentAvatarIndex = index;
        avatarInput.click();
    }

    avatarInput.onchange = function(e){
        const file = e.target.files[0];
        if(!file || currentAvatarIndex === null) return;
        const reader = new FileReader();
        reader.onload = function(ev){
            petList[currentAvatarIndex].avatar = ev.target.result;
            saveData();
            renderList();
            currentAvatarIndex = null;
        }
        reader.readAsDataURL(file);
    }

    // 渲染卡片
    function renderList() {
        petWrap.innerHTML = '';
        petList.forEach((item, index) => {
            let html = `
            <div class="pet-card">
                <div class="pet-avatar-wrap" onclick="changeAvatar(${index})">
            `;
            if(item.avatar){
                html += `<img src="${item.avatar}" alt="头像">`;
            }else{
                html += `<span class="avatar-tip">点我上传<br>照片</span>`;
            }
            html += `
                </div>
                <div class="pet-name">${item.name}</div>
                <div class="pet-info">
                    种类：${item.breed}<br>
                    生日：${item.birth}<br>
                    性别：${item.gender} | 体重：${item.weight}kg
                </div>
                <div class="card-btn-group">
                    <button class="card-btn edit-btn" onclick="editPet(${index})">修改</button>
                    <button class="card-btn del-btn" onclick="delPet(${index})">删除</button>
                </div>
            </div>
            `;
            petWrap.innerHTML += html;
        })
        petWrap.appendChild(addPetBtn);
    }

    // 添加新宠物按钮
    addPetBtn.onclick = function () {
        editIndex = null;
        formTitle.innerText = '添加宠物信息';
        mask.style.display = 'flex';
        petName.value = '';
        petBreed.value = '';
        petBirth.value = '';
        petGender.value = '公';
        petWeight.value = '';
    }

    cancelBtn.onclick = function () {
        mask.style.display = 'none';
    }

    submitBtn.onclick = function () {
        const name = petName.value.trim();
        const breed = petBreed.value.trim();
        const birth = petBirth.value;
        const gender = petGender.value;
        const weight = petWeight.value.trim();

        if(!name || !breed || !birth || !weight){
            alert('请填全所有信息！');
            return;
        }

        if(editIndex === null){
            petList.push({
                name, breed, birth, gender, weight, avatar:null
            })
        }else{
            petList[editIndex].name = name;
            petList[editIndex].breed = breed;
            petList[editIndex].birth = birth;
            petList[editIndex].gender = gender;
            petList[editIndex].weight = weight;
        }
        saveData();
        renderList();
        mask.style.display = 'none';
    }

    function saveData(){
        localStorage.setItem('petData', JSON.stringify(petList));
    }

    // 页面加载渲染
    renderList();
})
