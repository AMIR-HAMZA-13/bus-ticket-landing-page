

//selection elements/ finding elements;
const seatsNumber = document.querySelectorAll('.seat-number');
const selectedColor = document.getElementById('selected-color');
const economyContainer = document.getElementById('economy-container');
const price = document.getElementById('total-price');
const couponInput = document.getElementById('coupon-input');
const applyBtn = document.getElementById('apply-btn');
const grandPrice = document.getElementById('grand-price');
const couponContainer = document.querySelector('.coupon-container');
const numberInput = document.getElementById('number-input');
const nextButton = document.getElementById('next');

//variable declare;
let totalSeat = 40;
let ticketBasePrice = 550;
let seatCounting = 0;
let maxSeats = 4;
let selectedSeats = [];

//for  page scrolling after clicking Buy Button
document.getElementById('buy-ticket-btn').addEventListener('click', function () {
    const paribahanSection = document.getElementById('ph-paribahan-section');
    paribahanSection.scrollIntoView({ behavior: 'smooth' });
});


//selectSeatNumber function;
const handleClickSeat = (event) => {
    event.preventDefault();
    const eventTarget = event.target;
    selectedColor.style.color = '#1DD800';

    //check if seat is already selected;
    if (eventTarget.classList.contains('selected')) {
        return;
    }
    //check if maximum seats selected;
    if (seatCounting >= maxSeats) {
        alert('You can only select up to 4 seats !');
        return;
    }
    eventTarget.classList.add('selected');
    selectedSeats.push(eventTarget.textContent);

    // seat counting
    seatCounting++;
    document.getElementById('seat').textContent = seatCounting;
    const totalPrice = ticketBasePrice * seatCounting;
    price.textContent = `${totalPrice}`;

    //show message with seat are selected;
    const economySeat = document.createElement('div');
    economySeat.classList.add('economy-seat');
    economySeat.innerHTML = `
        <p class = "economy"> ${eventTarget.textContent} </p>
        <p class= "economy"> Economy </p>
        <p class = "economy"> 550 <p>
        `;
    economyContainer.appendChild(economySeat);

    //seat-left counting;
    if (totalSeat > 0) {
        totalSeat--;
        document.getElementById('seat-left').textContent = totalSeat;
    }

    //disable all unselected seats when after 4 seats selected;
    if (seatCounting === maxSeats) {
        //enable coupon input filed after selected 4 button;
        couponInput.disabled = false;
        couponInput.focus();

        seatsNumber.forEach(seat => {
            if (!seat.classList.contains('selected')) {
                seat.style.backgroundColor = '#f7f8f8';
                seat.style.cursor = 'not-allowed';
            }
        });
    }
};


//adding  addEventListener; 
seatsNumber.forEach(seatNumber => {
    seatNumber.addEventListener('click', handleClickSeat);
});


//enter specific coupon code then enable apply button;
const validCoupons = ['NEW15', 'COUPLE20'];
couponInput.addEventListener('input', function () {
    const enteredCode = this.value.trim().toUpperCase();
    const isValidCoupon = validCoupons.includes(enteredCode);
    applyBtn.disabled = !isValidCoupon;
});

applyBtn.addEventListener('click', function () {
    const couponCode = couponInput.value.trim().toUpperCase();

    if (validCoupons.includes(couponCode)) {
        const totalPrice = ticketBasePrice * seatCounting;
        let discount = 0;

        if (couponCode === 'NEW15') {
            discount = totalPrice * 0.15;
        } else if (couponCode === 'COUPLE20') {
            discount = totalPrice * 0.20;
        }

        const discountedPrice = totalPrice - discount;
        grandPrice.textContent = discountedPrice;

        //hide coupon container after applying;
        couponContainer.style.display = 'none';
        alert(`Coupon applied successfully! You saved  ${discount} Tk`);
    }

});

numberInput.addEventListener('input', function () {
    const phoneNumber = numberInput.value.trim();
    const isValid = validPhoneNumber(phoneNumber);
    nextButton.disabled = !isValid; 3


    function validPhoneNumber(number) {
        //Bangladeshi Mobile number regex pattern
        const regex = /^01[3-9]\d{8}$/;
        return regex.test(number);
    }

});
