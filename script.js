document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('file-input');
    const uploadButton = document.getElementById('upload-button');
    const fileList = document.getElementById('file-list');

    // Event listener for file upload
    uploadButton.addEventListener('click', function () {
        const files = fileInput.files;

        if (files.length > 0) {
            uploadFiles(files);
        }
    });

    // Function to upload files
    function uploadFiles(files) {
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append('file', files[i]);
        }

        // Send a POST request to the server endpoint for file uploads
        fetch('/upload', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('File upload failed');
            }
        })
        .then(data => {
            console.log(data); // Server response data (e.g., file details)
            updateFileList(data);
        })
        .catch(error => {
            console.error(error);
        });
    }

    // Function to update the file list with data from the server
    function updateFileList(data) {
        const ul = document.createElement('ul');

        data.forEach(file => {
            const li = document.createElement('li');
            li.textContent = file.name;
            ul.appendChild(li);
        });

        fileList.innerHTML = '';
        fileList.appendChild(ul);
    }
});
