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

        fetch('/upload', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (response.status === 200) {
                return response.json(); // Assuming the server responds with JSON data
            } else {
                throw new Error('File upload failed');
            }
        })
        .then(data => {
            console.log(data); // Server response data (e.g., file details)
            updateFileList(data); // Call the updateFileList function with the server response data
        })
        .catch(error => {
            console.error(error);
        });
    }

    // Function to update the file list with data from the server
    function updateFileList(data) {
        // Assuming data is an array of file details received from the server
        const ul = document.createElement('ul');
        
        data.forEach(file => {
            const li = document.createElement('li');
            li.textContent = file.name;
            ul.appendChild(li);
        });

        // Clear the existing file list and add the updated list
        fileList.innerHTML = '';
        fileList.appendChild(ul);
    }
});
