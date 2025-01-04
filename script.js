function vote(participantId) {
    if (localStorage.getItem('voted')) {
        alert('Vous avez déjà voté.');
        return;
    }

    fetch('vote.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ participantId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem('voted', true);
            updateResults();
        } else {
            alert(data.message);
        }
    });
}

function updateResults() {
    fetch('results.php')
    .then(response => response.json())
    .then(data => {
        const totalVotes = Object.values(data).reduce((acc, curr) => acc + curr, 0);

        document.querySelectorAll('.participant').forEach(participant => {
            const id = parseInt(participant.getAttribute('data-id'));
            const percentage = (data[id] || 0) / totalVotes * 100;
            participant.querySelector('.gauge').style.width = `${percentage}%`;
            participant.querySelector('.percentage').textContent = `${percentage.toFixed(2)}%`;
        });
    });
}

document.addEventListener('DOMContentLoaded', updateResults);
