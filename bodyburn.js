const metricBtn = document.querySelector('#metricBtn');
const usBtn = document.querySelector('#usBtn');
const metricForm = document.querySelector('#metricForm');
const usForm = document.querySelector('#usForm');
const bmiResult = document.querySelector('#bmiResult');
const bmrResult = document.querySelector('#bmrResult');
const proteinResult = document.querySelector('#proteinResult');
const resultContainer = document.querySelector('#resultContainer');
const resetBtns = document.querySelectorAll('.resetBtn');



metricBtn.addEventListener('click', function(){
    metricBtn.classList.add('active');
    usBtn.classList.remove('active');
    metricForm.style.display = 'block';
    usForm.style.display = 'none';
});
usBtn.addEventListener('click', function(){
    usBtn.classList.add('active');
    metricBtn.classList.remove('active');
    usForm.style.display = 'block';
    metricForm.style.display = 'none';
});

class Body{
    constructor(sex, age, height, weight, bmrUnit){
        this.sex = sex;
        this.age = age;
        this.height = height;
        this.weight = weight;
        this.bmrUnit = bmrUnit;
    }
    bmi(){
        const{height, weight} = this;
        let bmi = weight/Math.pow(height/100,2);
        return bmi.toFixed(1);
    }
    bmr(){
        const{sex, age, height, weight, bmrUnit} = this;
        let bmr = 0;
        if(sex === 'male'){
            bmr = 10*weight+ 6.25*height- 5*age +5;
        }
        if(sex === 'female'){
            bmr = 10*weight+ 6.25*height- 5*age - 165; 
        }
        if(bmrUnit === 'kJ'){
            return `${(4.184*bmr).toFixed(1)} kJ/day `;
        }
        return `${bmr.toFixed(1)} kcal/day `;
    }
    protein(){
        const{weight} = this;
        let protein = (1.5*weight).toFixed(1);
        return `${protein} g/day `;
    }
};

// metricForm.addEventListener('submit',function(e){
//     let sex = metricForm.elements['metricSex'].value;
//     let age = metricForm.elements['metricAge'].value;
//     let height = metricForm.elements['metricHeight'].value;
//     let weight = metricForm.elements['metricWeight'].value;
//     const body = new Body(sex,Number(age),Number(height),Number(weight));
//     e.preventDefault();
//     bmiResult.textContent = body.bmi();
//     bmrResult.textContent = body.bmr();
//     proteinResult.textContent = body.protein();
// });





const calculateMetric = function(){
    let sex = metricForm.elements['metricSex'].value;
    let age = metricForm.elements['metricAge'].value;
    let height = metricForm.elements['metricHeight'].value;
    let weight = metricForm.elements['metricWeight'].value;
    let bmrUnit = metricForm.elements['resultUnit1'].value;
    const body = new Body(sex,Number(age),Number(height),Number(weight), bmrUnit);
    bmiResult.textContent = body.bmi();
    bmrResult.textContent = body.bmr();
    proteinResult.textContent = body.protein();
};
metricForm.addEventListener('submit',function(e){
    resultContainer.style.display = 'block';
    e.preventDefault();
    calculateMetric();
    
});

const calculateUs = function(){
    let sex = usForm.elements['usSex'].value;
    let age = usForm.elements['usAge'].value;
    let heightFt = Number(usForm.elements['heightFT'].value);
    let heightIn = Number(usForm.elements['heightIn'].value);
    let height = 2.54*(heightFt*12 + heightIn);
    let weightLbs = Number(usForm.elements['weightLbs'].value);
    let weight = 0.454*weightLbs;
    let bmrUnit = usForm.elements['resultUnit2'].value;
    const body = new Body(sex,Number(age),height,weight, bmrUnit);
    bmiResult.textContent = body.bmi();
    bmrResult.textContent = body.bmr();
    proteinResult.textContent = body.protein();
};

for(let resetBtn of resetBtns){
    resetBtn.addEventListener('click',function(){
        metricForm.elements['metricAge'].value = "";
        metricForm.elements['metricHeight'].value = "";
        metricForm.elements['metricWeight'].value = "";

        usForm.elements['usAge'].value="";
        usForm.elements['heightFT'].value="";
        usForm.elements['heightIn'].value="";
        usForm.elements['weightLbs'].value="";

        resultContainer.style.display = 'none';
    });
}
usForm.addEventListener('submit', function(evt){
    resultContainer.style.display = 'block';
    calculateUs();
    evt.preventDefault();
    
    
});


