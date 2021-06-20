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

	
	//=======================================================================================
});
