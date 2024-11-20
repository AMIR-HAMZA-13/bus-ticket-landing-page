//for  page scrolling after clicking Buy Button
document.getElementById('buy-ticket-btn').addEventListener('click', function(){
        const paribahanSection = document.getElementById('ph-paribahan-section');
        paribahanSection.scrollIntoView({behavior: 'smooth'}); 
});

