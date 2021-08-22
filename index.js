document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('ops').addEventListener('click', (e) => {
		e.stopPropagation();
		if (!e.target.parentElement.classList.contains('is-active')) {
			document.querySelector('li.is-active').classList.remove('is-active');
			e.target.parentElement.classList.add('is-active')
			document.getElementById('create').classList.add('is-hidden');
			document.getElementById('retrieve').classList.add('is-hidden');
			document.getElementById('update').classList.add('is-hidden');
			document.getElementById('deletion').classList.add('is-hidden')
			switch (e.target.textContent) {
				case 'Create':
					document.getElementById('create').classList.remove('is-hidden');
					break
				case 'Retrieve':
					document.getElementById('retrieve').classList.remove('is-hidden');
					break
				case 'Update':
					document.getElementById('update').classList.remove('is-hidden');
					break
				case 'Delete':
					document.getElementById('deletion').classList.remove('is-hidden');
					break
			}
		}
	});

	document.getElementById('createBtn').addEventListener('click', async (e) => {
		const id = document.getElementById('createID').value;
		const name = document.getElementById('createName').value;
		const grade = document.getElementById('createHOD').value;
		if (id === '' || name === '' || grade === '') {
			alert('Please enter all details!');
		}
		else {
			const dept = {
				"id": id,
				"name": name,
				"grade": grade
			}
			try {
				const response = await fetch('http://localhost:3000/db', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(dept)
				});
				alert("Student successfully added")
			}
			catch (err) {
				console.error(err);
			}
		}
	});

	document.getElementById('retrieveBtn').addEventListener('click', async (e) => {
		const id = document.getElementById('retrieveID').value;
		if (id === '') {
			alert('Please enter all details!');
		}
		else {
			try {
				const response = await fetch('http://localhost:3000/db');
				const data = await response.json();
				const dept = data.db;
				const item = dept.find((ele) => {
					return ele.id === id;
				})
				const parent = document.getElementById('results');
				while (parent.hasChildNodes()) {
					parent.removeChild(parent.firstChild);
				}
				const text1 = document.createElement('h5');
				text1.classList.add('title', 'is-5');
				text1.innerHTML = `ID: ${item.id}`;
				parent.appendChild(text1);
				const text2 = document.createElement('h5');
				text2.classList.add('title', 'is-5');
				text2.innerHTML = `Name: ${item.name}`;
				parent.appendChild(text2);
				const text3 = document.createElement('h5');
				text3.classList.add('title', 'is-5');
				text3.innerHTML = `Grade: ${item.grade}`;
				parent.appendChild(text3);
				const breaker = document.createElement('br');
				parent.appendChild(breaker);
			}
			catch (err) {
				console.error(err);
			}
		}
	});

	document.getElementById('retrieveAll').addEventListener('click', async (e) => {
		try {
			const response = await fetch('http://localhost:3000/db');
			const data = await response.json();
			const dept = data.db;
			const parent = document.getElementById('results');
			while (parent.hasChildNodes()) {
				parent.removeChild(parent.firstChild);
			}
			dept.forEach(item => {
				console.log(item);
				const text1 = document.createElement('h5');
				text1.classList.add('title', 'is-5');
				text1.innerHTML = `ID: ${item.id}`;
				parent.appendChild(text1);
				const text2 = document.createElement('h5');
				text2.classList.add('title', 'is-5');
				text2.innerHTML = `Name: ${item.name}`;
				parent.appendChild(text2);
				const text3 = document.createElement('h5');
				text3.classList.add('title', 'is-5');
				text3.innerHTML = `Grade: ${item.grade}`;
				parent.appendChild(text3);
				const breaker = document.createElement('br');
				parent.appendChild(breaker);
			});
		}
		catch (err) {
			console.error(err);
		}
	});

	document.getElementById('updateBtn').addEventListener('click', async (e) => {
		const id = document.getElementById('updateID').value;
		const name = document.getElementById('updateName').value;
		const grade = document.getElementById('updateHOD').value;
		if (id === '' || name === '' || grade === '') {
			alert('Please enter all details!');
		}
		else {
			const dept = {
				"id": id,
				"name": name,
				"grade": grade
			}
			try {
				const response = await fetch(`http://localhost:3000/db/${id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(dept)
				});
				if (response.status === 404) {
					alert('The requested ID was not found!')
				}
			}
			catch (err) {
				console.error(err);
			}
		}
	});

	document.getElementById('deleteBtn').addEventListener('click', async (e) => {
		const id = document.getElementById('deleteID').value;
		if (id === '') {
			alert('Please enter all details!');
		}
		try {
			const response = await fetch(`http://localhost:3000/db/${id}`, {
				method: 'DELETE'
			});
		}
		catch (err) {
			console.error(err);
		}
	});

});