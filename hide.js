async function makeDoubleAnswer(button) {


    const dataIdBtn = button.getAttribute("data-button-id");


    const magicListAnswer = document.querySelector(`.listDl-${dataIdBtn}`);

    if (!magicListAnswer) {
        console.error("Container not found.");
        return;
    }

    const form = button.closest("form");
    const inputElement = form.querySelector(".printable");
    const taskDescription = inputElement.value;

    const apiKey = "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";

    const message = `Give me all tasks for ${taskDescription}`;

    console.log(message);

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/completions",
            {
                prompt: message,
                model: "text-davinci-003",
                temperature: 0,
                max_tokens: 1000,
                top_p: 1,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
            }
        );

        const chatbotResponse = response.data.choices[0].text;
        const tasks = chatbotResponse.split("\n").filter(task => task.trim() !== "");

        magicListAnswer.innerHTML = "";

        var btnDoubles = 0;
        var listAnswerDouble = 0;

        tasks.forEach((task, taskIndex) => {
            const ulElement = document.createElement("ul");
            ulElement.classList.add("list-unstyled", "ms-3", "ui-sortable", "highlight");
            ulElement.style.minHeight = "1.5rem";
            const isFirstItem = taskIndex === 0;
            const collapseClass = isFirstItem ? "collapse-btn position-absolute mx-1" : "collapse-btn position-absolute mx-1 d-none";


            const isLastItems = taskIndex === tasks.length - 1;
            const borderBottomClasss = isLastItems ? "list-group-item-content border border-bottom-1 m-0 ml-5 mr-2" : "list-group-item-content border border-bottom-0 m-0 ml-5 mr-2";




            ulElement.innerHTML = `
<div style="position: relative;">
<div class="${borderBottomClasss}">
     <div class="">
      <form action="" method="post" id="" class="list-group-item-content d-flex justify-content-between m-0 py-2 px-2 ">
      <div class="d-flex align-items-center">
        <div class="handle me-2">
          <i class="fas fa-grip-vertical position-relative mx-2" ></i>
        </div>
        <div class="checkbox-container">
          <input type="checkbox" class="printable checkCOPY pe-2" style="width: 16px; height: 16px; margin-top: 6px;" aria-labelledby="complete task" value="${task}">
        </div>
        <span class="todoText printable">${task}</span>
      </div>
      <div class="ms-1" >
        <div class="d-inline-flex flex-column w-100 align-items-end align-content-end align-self-end justify-content-end" style="min-width:70px;">
          <div class="d-inline-flex w-100 align-items-center align-content-end align-self-end justify-content-end" style="min-width: 70px;">
            <div><p class="${task} m-0 pr-2"></p></div>
            <div class="dropdown ms-1">
                <button  id="dropdownButton" class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-display="static" style="height: 32px; width: 34px;" aria-haspopup="true" aria-label="show task options" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
              </button>
                <div id="dropdownMenu" class="dropdown-menu dropdown-menu-end">
                  <div class="dropdown-item">
                    <button type="button" class="btn btn-sm btn-outline-primary w-100" onclick="estimateTimesss(this)" value="${task}" data-button-id="${task}"><i class="fas fa-clock"></i> Estimate</button>
                  </div>
                </div>
                  

              </div>
            </div>
          </div>
        </div>
      </div>
        </div>

        
        </form>

        
       

      </div>


     
      </div>
`;

            magicListAnswer.appendChild(ulElement);
        });




    } catch (error) {
        console.error("Error fetching chatbot response:", error);
    }
}








async function estimateTimesss(button) {
    const idBtn = button.getAttribute('data-button-id');
    const className = idBtn.split(' ')[0];
    console.log(className);
    const buttonValue = button.value;
    const apiKey = "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";
    const message = 'Give me an estimate hours for this activity: ' + buttonValue + '. Just time, not money. give me just number time not text just time';

    const paragraphElements = document.getElementsByClassName(className);

    if (paragraphElements.length > 0) {
        const divElement = paragraphElements[0].parentNode;
        axios.post(
            "https://api.openai.com/v1/completions",
            {
                prompt: message,
                model: "text-davinci-003",
                temperature: 0,
                max_tokens: 1000,
                top_p: 1,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
            }
        )
            .then(response => {
                const chatbotResponse = response.data.choices[0].text;
                paragraphElements[0].textContent = chatbotResponse;
            })
            .catch(error => {
                console.error("Error fetching chatbot response:", error);
            });
    } else {
        console.error('Paragraph with class ' + className + ' not found.');
    }
}




async function estimateTimess(button) {
    const idBtn = button.getAttribute('data-button-id');
    const className = idBtn.split(' ')[0];
    console.log(className);
    const buttonValue = button.value;
    const apiKey = "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";
    const message = 'Give me an estimate by hours or seconds for this activity: ' + buttonValue + 'give me just number';

    const paragraphElements = document.getElementsByClassName(className);

    if (paragraphElements.length > 0) {
        const divElement = paragraphElements[0].parentNode;
        axios.post(
            "https://api.openai.com/v1/completions",
            {
                prompt: message,
                model: "text-davinci-003",
                temperature: 0,
                max_tokens: 1000,
                top_p: 1,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
            }
        )
            .then(response => {
                const chatbotResponse = response.data.choices[0].text;


                paragraphElements[0].textContent = chatbotResponse;
            })
            .catch(error => {
                console.error("Error fetching chatbot response:", error);
            });
    } else {
        console.error('Paragraph with class ' + className + ' not found.');
    }
}






async function makeAnswer(button) {
    const dataIdBtn = button.getAttribute('data-button-id');

    var magicListAnswer = "";

    if (dataIdBtn !== null) {
        magicListAnswer = document.querySelector('.heey-' + dataIdBtn);
    } else {
        console.error('data-button-id is null or not found on the button.');
    }

    localStorage.setItem(`buttonHidden-${dataIdBtn}`, 'true');

    const form = button.closest("form");
    const inputElement = form.querySelector(".printable");
    const apiKey = "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";
    const message = 'Give me all tasks for' + ' ' + inputElement.value;

    console.log(message);

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/completions",
            {
                prompt: message,
                model: "text-davinci-003",
                temperature: 0,
                max_tokens: 1000,
                top_p: 1,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
            }
        );

        const chatbotResponse = response.data.choices[0].text;
        const tasks = chatbotResponse.split("\n").filter(task => task.trim() !== "");

        var itemsArray = JSON.parse(localStorage.getItem("todoItems")) || [];

        itemsArray.forEach(item => {
            if (item.item === inputElement.value) {
                item.tasks = tasks;
            }
        });

        localStorage.setItem("todoItems", JSON.stringify(itemsArray));
        location.reload();
    } catch (error) {
        console.error("Error fetching chatbot response:", error);
    }
    button.classList.add('d-none');
}



async function estimateTime(button) {
    const idBtn = button.getAttribute('data-button-id');
    const buttonValue = button.value;
    const apiKey = "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";
    var divElement = "";
    const message = 'Give me an estimate hours for this activity: ' + buttonValue + '. Just time, not money. give me just number time not text just time';


    if (idBtn !== null) {
        divElement = document.querySelector('.txt-' + idBtn);
    } else {
        console.error('data-button-id is null or not found on the button.');
    }

    axios.post(
        "https://api.openai.com/v1/completions",
        {
            prompt: message,
            model: "text-davinci-003",
            temperature: 0,
            max_tokens: 1000,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
        }
    )
        .then(response => {
            const chatbotResponse = response.data.choices[0].text;
            divElement.innerHTML = chatbotResponse;
        })
        .catch(error => {
            console.error("Error fetching chatbot response:", error);
        });

}



