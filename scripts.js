// Example job data
const jobSheets = [
    {
        id: 1,
        clientName: 'Nandini Goswami',
        contactInfo: '1234567890',
        receivedDate: '2024-09-05',
        inventoryReceived: 'Mouse',
        reportedIssues: 'Issue with click',
        clientNotes: 'Client reported issue with left click.',
        assignedTechnician: 'Technician A',
        estimatedAmount: '$100',
        deadline: '2024-09-18',
        status: 'In Progress'
    }
    // Add more jobs as needed
];

// Function to view job sheet
function viewJobSheet(id) {
    const job = jobSheets.find(job => job.id === id);
    localStorage.setItem('viewJob', JSON.stringify(job));
    window.location.href = 'view-job-sheet.html';
}

// Event listener for the 'View' button
document.querySelectorAll('.view-btn').forEach(function(button) {
    button.addEventListener('click', function() {
        const jobId = this.getAttribute('data-id'); // Ensure buttons have data-id attributes
        viewJobSheet(parseInt(jobId, 10));
    });
});

// Event listener for the 'Edit' button
document.querySelectorAll('.edit-btn').forEach(function(button) {
    button.addEventListener('click', function() {
        const jobId = this.getAttribute('data-id'); // Ensure buttons have data-id attributes
        window.location.href = `edit.html?id=${jobId}`;
    });
});

// Event listener for the 'Delete' button
document.querySelectorAll('.delete-btn').forEach(function(button) {
    button.addEventListener('click', function() {
        const jobId = this.getAttribute('data-id'); // Ensure buttons have data-id attributes
        if (confirm('Are you sure you want to delete this job sheet?')) {
            const index = jobSheets.findIndex(job => job.id === parseInt(jobId, 10));
            if (index > -1) {
                jobSheets.splice(index, 1);
                localStorage.setItem('jobSheets', JSON.stringify(jobSheets));
                alert('Job sheet deleted.');
            }
        }
    });
});

// Event listener for the 'New Job Sheet' button
document.getElementById('new-job-button').addEventListener('click', function() {
    window.location.href = 'new-job-sheet.html';
});

// Load and populate form on the edit page
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('edit.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const jobId = parseInt(urlParams.get('id'), 10);

        const job = JSON.parse(localStorage.getItem('viewJob'));
        if (job && job.id === jobId) {
            document.getElementById('client-name').value = job.clientName;
            document.getElementById('contact-info').value = job.contactInfo;
            document.getElementById('received-date').value = job.receivedDate;
            document.getElementById('inventory-received').value = job.inventoryReceived;
            document.getElementById('inventory-doc').value = job.inventoryDoc || '';
            document.getElementById('reported-issues').value = job.reportedIssues;
            document.getElementById('client-notes').value = job.clientNotes;
            document.getElementById('assigned-technician').value = job.assignedTechnician;
            document.getElementById('estimated-amount').value = job.estimatedAmount;
            document.getElementById('deadline').value = job.deadline;
            document.getElementById('status').value = job.status;
        }
    }
});

// Handle form submission on the edit page
document.querySelector('.edit-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const urlParams = new URLSearchParams(window.location.search);
    const jobId = parseInt(urlParams.get('id'), 10);

    const clientName = document.getElementById('client-name').value;
    const contactInfo = document.getElementById('contact-info').value;
    const receivedDate = document.getElementById('received-date').value;
    const inventoryReceived = document.getElementById('inventory-received').value;
    const inventoryDoc = document.getElementById('inventory-doc').value;
    const reportedIssues = document.getElementById('reported-issues').value;
    const clientNotes = document.getElementById('client-notes').value;
    const assignedTechnician = document.getElementById('assigned-technician').value;
    const estimatedAmount = document.getElementById('estimated-amount').value;
    const deadline = document.getElementById('deadline').value;
    const status = document.getElementById('status').value;

    const updatedJobSheet = {
        id: jobId, // Ensure you keep the job ID
        clientName,
        contactInfo,
        receivedDate,
        inventoryReceived,
        inventoryDoc,
        reportedIssues,
        clientNotes,
        assignedTechnician,
        estimatedAmount,
        deadline,
        status
    };

    // Update jobSheets array and save to localStorage
    const index = jobSheets.findIndex(job => job.id === jobId);
    if (index > -1) {
        jobSheets[index] = updatedJobSheet;
        localStorage.setItem('jobSheets', JSON.stringify(jobSheets));
    }

    alert('Changes have been made successfully!');
    window.location.href = 'index.html';
});
document.addEventListener('DOMContentLoaded', function() {
    // Event listener for the 'Search' button
    document.getElementById('search-button').addEventListener('click', function() {
        const searchValue = document.getElementById('search').value.toLowerCase();
        console.log('Search value:', searchValue); // Debug: log the search value
        
        const rows = document.querySelectorAll('.jobsheet-table tbody tr');
        
        rows.forEach(row => {
            const clientId = row.cells[1].textContent.toLowerCase();
            const clientName = row.cells[2].textContent.toLowerCase();
            console.log('Client ID:', clientId, 'Client Name:', clientName); // Debug: log cell values
            
            if (clientId.includes(searchValue) || clientName.includes(searchValue)) {
                row.style.display = ''; // Show row
            } else {
                row.style.display = 'none'; // Hide row
            }
        });
    });
});
