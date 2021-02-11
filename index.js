/* Function to get user data from fields */
const getSignatureData = () => {

  let nameEntered = document.getElementsByClassName("name-entered")[0].value;
  let titleEntered = document.getElementsByClassName("title-entered")[0].value;
  let emailEntered = document.getElementsByClassName("email-entered")[0].value;
  let phoneEntered = document.getElementsByClassName("phone-entered")[0].value;
  let faxEntered = document.getElementsByClassName("fax-entered")[0].value;
  let profilePictureLinkEntered = document.getElementsByClassName("profile-picture-entered")[0].value;
  let yourName = document.getElementsByClassName("your-name")[0];
  let yourTitle = document.getElementsByClassName("your-title")[0];
  let letterP = document.getElementsByClassName("letter-p")[0];
  let letterF = document.getElementsByClassName("letter-f")[0];
  let dividerLineOne = document.getElementsByClassName("divider-line-one")[0];
  let dividerLineTwo = document.getElementsByClassName("divider-line-two")[0];
  let yourPhone = document.getElementsByClassName("your-phone")[0];
  let yourFax = document.getElementsByClassName("your-fax")[0];
  let yourProfilePic = document.getElementsByClassName("profile-pic")[0];

  yourProfilePic.src = profilePictureLinkEntered;

  yourName.innerHTML = nameEntered;
  yourTitle.innerHTML = titleEntered;

  phoneEntered = formatPhoneNumber(phoneEntered);
  yourPhone.innerHTML = phoneEntered;

  faxEntered = formatPhoneNumber(faxEntered);
  yourFax.innerHTML = faxEntered;

  /* Display phone or fax letter (P or F) and divider (|) and then remove them if the input field(s) are left blank */
  letterP.style.display = "inline-block";
  dividerLineOne.style.display = "inline-block";

  if (phoneEntered.length < 1) {
    letterP.style.display = "none";
    dividerLineOne.style.display = "none";
  }

  letterF.style.display = "inline";
  dividerLineTwo.style.display = "inline-block";

  if (faxEntered < 1) {
    letterF.style.display = "none";
    dividerLineTwo.style.display = "none";
  }

  document.getElementById("your-email").innerHTML = emailEntered + "@yourcompany.com";
}

/* Function to format phone numbers */
const formatPhoneNumber = (thisPhoneNumber) => {
  /* Add period after every 3 numbers in phone number */
  thisPhoneNumber = thisPhoneNumber.replace(/(\S{3})/g, "$1.");

  /* Remove last period that would fall within the last 4 digits */
  thisPhoneNumber = thisPhoneNumber.slice(0, 11) + thisPhoneNumber.slice(12);
  return thisPhoneNumber;
}

/* On button click, generate email signature and display it onscreen */
const createSignatureButton = document.getElementsByClassName("create-signature-button")[0];

createSignatureButton.addEventListener("click", () => {
  let requiredInputFields = document.getElementsByClassName("required-input");
  let requiredInputFieldsLength = document.getElementsByClassName("required-input").length;

  /* Form validation to make sure required fields have been entered */
  for (let i = 0; i < requiredInputFieldsLength; i++) {
    if (requiredInputFields[i].value.length < 1) {
      requiredInputFields[i].classList.add("red");
      if (i == requiredInputFieldsLength - 1) {
        return false;
      }
    } else {
      requiredInputFields[i].classList.remove("red");
    }
  }

  getSignatureData();

  let emailSignatureToCopyWrapper = document.getElementsByClassName("email-wrapper")[0];

  emailSignatureToCopyWrapper.classList.remove("hidden");
});

/* On button click, copy email signature to clipboard */
let copyToClipBoardButton = document.getElementsByClassName("copy-to-clipboard-button")[0];

copyToClipBoardButton.addEventListener('click', () => selectText('full-email-signature'));

/* Function for selecting/copying email signature */
const selectText = (node) => {
  node = document.getElementById(node);

  if (document.body.createTextRange) {
    const range = document.body.createTextRange();
    range.moveToElementText(node);
    range.select();
  } else if (window.getSelection) {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  document.execCommand("copy");
}
