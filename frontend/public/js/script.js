window.addEventListener('DOMContentLoaded', () => {
	const preloader = document.querySelector('.preloader');
	setTimeout(() => {
		preloader.classList.add('hidden');
	}, 500);

    //====================================================================================
    
    const reg = document.querySelector('.register-form')

    reg && reg.addEventListener('submit', async (e) => {
        e.preventDefault()
        const data = {}
        e.target.querySelectorAll('input').forEach(item => data[item.name] = item.value)
        const res = await request('/register', 'POST', data)
        .then(res => res.json())
        .then(data => showMeassage(data.message))
        
    })

    //====================================================================================

	async function request(url, method = 'GET', body = {}, headers = {}) {
		if (body) {
			headers['Content-Type'] = 'application/json';
		}
		const res = await fetch(url, {
			method,
			body: JSON.stringify(body),
			headers,
		});

		if (!res.ok) {
			showMeassage('Что-то пошло не так...');
		}

		return res;
	}

	//====================================================================================

	function showMeassage(html) {
		const meassage = document.querySelector('.meassage');
		meassage.textContent = html;
		meassage.classList.add('active');

		setTimeout(() => {
			meassage.classList.remove('active');
			meassage.textContent = '';
		}, 3000);
	}
	//====================================================================================

	const close = document.querySelectorAll('.close');
	const modalBack = document.querySelectorAll('.modal_back');
	const mobailOpen = document.querySelector('.create-send');
	const emailOpen = document.querySelector('.send');
	const mobileModal = document.querySelector('.mobile_modal');
	const emailModal = document.querySelector('.email_modal');
	const tabs = document.querySelector('.tabs');
	const tabsItems = document.querySelectorAll('.tabs-item');
	const contents = document.querySelectorAll('.content-item');
	const sender = document.querySelectorAll('.sender');
	const addresesBook = document.querySelector('.address-book');
	const addressBookOpen = document.querySelector('.address-book-open');
	const mailBook = document.querySelectorAll('.mail-book');
	const createAddress = document.querySelector('.create-address');
	const createAddressBookOpen = document.querySelector(
		'.create-address-book-open'
    );
    const deleteBook = document.querySelector('.delete-book')

	close &&
		close.forEach(item => {
			item.addEventListener('click', e => {
				e.target.parentNode.parentNode.classList.remove('active');
				document.body.style.overflow = 'visible';
			});
		});

	mailBook &&
		mailBook.forEach(item => {
			item.addEventListener('click', () => {
				item.classList.toggle('active');
			});
		});

	modalBack &&
		modalBack.forEach(item => {
			item.addEventListener('click', e => {
				if (!e.target.classList.contains('modal')) {
					document.body.style.overflow = 'visible';
					e.target.classList.remove('active');
				}
			});
		});

	function deleteActive(elem) {
		elem.forEach(item => {
			item.classList.remove('active');
		});
	}

	function open(elem) {
		document.body.style.overflow = 'hidden';
		elem.classList.add('active');
	}

	mobailOpen &&
		mobailOpen.addEventListener('click', () => {
			open(mobileModal);
		});
	emailOpen &&
		emailOpen.addEventListener('click', () => {
			open(emailModal);
		});

	addressBookOpen &&
		addressBookOpen.addEventListener('click', () => {
			open(addresesBook);
		});

	createAddressBookOpen &&
		createAddressBookOpen.addEventListener('click', () => {
			open(createAddress);
		});

	tabs &&
		tabs.addEventListener('click', e => {
			tabsItems.forEach((item, i) => {
				if (e.target == item) {
					deleteActive(contents);
					contents[i].classList.add('active');
				}
			});
		});


	//====================================================================================

	function reset() {
		deleteActive(tabsItems);
		deleteActive(contents);
		emailModal.classList.remove('active');
		mobileModal.classList.remove('active');
		addresesBook.classList.remove('active');
		createAddress.classList.remove('active');
		document.body.style.overflow = 'visible';
	}

	sender.length &&
		sender.forEach(item => {
			item.addEventListener('submit', async e => {
				const path = ['template', 'sometemplate', 'text', 'sms', 'addbook'];
				e.preventDefault();
				const num = e.target.dataset.num;
				const data = {};
				e.target.querySelectorAll('input').forEach(item => {
					if (item.name === 'emails') {
						data[item.name] = item.value.split(' ');
					}
					if (!data[item.name]) {
						data[item.name] = item.value;
					}
				});

				const html = e.target.querySelector('textarea');
				if (html) {
					data[html.name] = html.value;
				}

				const select = e.target.querySelector('select');
				data[select.name] = select.value;

				const res = await request(`/sender/${path[+num]}`, 'POST', data)
					.then(res => res.json())
					.then(data => showMeassage(data.message));
				e.target.reset();
                reset();
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
			});
        });
        
        deleteBook && deleteBook.addEventListener('click', async (e) => {
           await request(`/sender/deletebook/${e.target.dataset.id}`, 'DELETE')
            .then(res => res.json())
            .then(data => showMeassage(data.message));
           reset();
           setTimeout(() => {
            window.location.reload()
        }, 1000)
        })

	//=======================================================================================

	const logout = document.querySelector('.logout');

	logout &&
		logout.addEventListener('click', async () => {
			await fetch('logout');
			window.location.href = '/login';
		});

	//=======================================================================================
});
