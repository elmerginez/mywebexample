const textElement = document.querySelector('.text');
const texts = ['Frontend Developer','Backend Developer'];
let index = 0;

function animateText() {
    let currentText = texts[index];
    const chars = currentText.split('');
    let i = 0;
  
    function type() {
        if (i < chars.length) {
            textElement.textContent += chars[i];
            i++;
            setTimeout(type, 120);
        } else {
            setTimeout(erase, 1000);
        }
    }
  
    function erase() {
        const text = textElement.textContent;
        if (text.length > 0) {
            textElement.textContent = text.substring(0, text.length - 1);
            setTimeout(erase, 80);
        } else {
            index++;
            if (index === texts.length) {
                index = 0;
            }
            setTimeout(animateText, 1000);
        }
    }
    type();
}
animateText();