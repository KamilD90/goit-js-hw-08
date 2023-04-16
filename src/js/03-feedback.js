import throttle from 'lodash.throttle';

const form = document.querySelector('form');
const emailProvided = document.querySelector("[name='email']");
const messageWritten = document.querySelector("[name='message']");
//mam złapane elementy z kodu HTML, terazpotrzeba funkcji która zapisze nam wartości wprowonycadzh pól do localStorage
function saveForm() {
  const formValues = {
    email: emailProvided.value,
    message: messageWritten.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formValues));
  // localStorage jest mechanizmem przetrzymywania danych, który obsługuje tylko dane typu string. Aby więc zapisać obiekt JavaScript w localStorage, musimy go przekształcić na format stringowy. Metoda JSON.stringify() służy do przekształcania obiektów JavaScript na ciągi znaków w formacie JSON, który jest tekstem i może być zapisany w localStorage.
}

// nastęnie tworzymy funkcje odczytu zapisanych w localStorage wartości

function loadFormValues() {
  const formValues = JSON.parse(localStorage.getItem('feedback-form-state'));
  // Podczas odczytu danych z localStorage, używamy metody JSON.parse(), aby przekształcić ciąg znaków JSON zapisany w localStorage na obiekt JavaScript.
  if (formValues) {
    emailProvided.value = formValues.email;
    messageWritten.value = formValues.message;
  }
}
//funkcja wywoływana po wysłaniu formularza, po kliknięciu na button submitt

const handleSubmit = event => {
  //   zapobiega domyślnemu wyczyszczeniu formularza tuż po naciśnięciu submit
  //   debugger;
  //jak chcesz sie zatrzymać w kodzie możesz sprawdzić jaki jest stan

  event.preventDefault();
  //JEBANE LITERÓWKI default nie deafult

  //teraz wyrzuć do konsoli obiekt z polami email i message
  console.log({
    email: emailProvided.value,
    message: messageWritten.value,
  });
  //teraz wyczyść obiekt feedback-form-state z pamięci przeglądarki
  localStorage.removeItem('feedback-form-state');
  emailProvided.value = '';
  messageWritten.value = '';
};

//dodamy eventlistner na pola email i textarea
//Zdarzenie input w JavaScript jest wywoływane, gdy użytkownik dokonuje zmiany w elemencie formularza (np. wprowadza tekst do pola tekstowego, wybiera opcję z listy rozwijanej itp.).
// Kiedy użytkownik wprowadza dane, zdarzenie input jest wywoływane w czasie rzeczywistym, w odróżnieniu od zdarzenia change, które jest wywoływane dopiero po opuszczeniu pola formularza.
emailProvided.addEventListener('input', throttle(saveForm, 500));
messageWritten.addEventListener('input', throttle(saveForm, 500));

document.addEventListener('DOMContentLoaded', loadFormValues);
//DOMContentLoaded to zdarzenie, które jest wywoływane, gdy przeglądarka w pełni załadowała dokument HTML, a następnie wygenerowała drzewo DOM (Document Object Model) dla całej strony.

form.addEventListener('submit', handleSubmit);
