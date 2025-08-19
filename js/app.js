class CalorieTracker {
  constructor() {
    this._setCalories = 2000;
    this._totalCalories = 0;
    this._consumedCalories = 0;
    this._burnedCalories = 0;
    this._remainingCalories = this._setCalories;
    this._meals = [];
    this._workouts = [];
    this._renderStats();
  }

  // public methods

  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    this._consumedCalories += meal.calories;
    this._remainingCalories -= meal.calories;
    this._renderStats();
  }

  addWorkOut(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    this._burnedCalories += workout.calories;
    this._remainingCalories += workout.calories;
    this._renderStats();
  }

  //private methods

  _displaySetCalories() {
    document.querySelector("#calories-limit").innerText = this._setCalories;
  }

  _displayTotalCalories() {
    document.querySelector("#calories-total").innerText = this._totalCalories;
  }

  _displayCaloriesConsumed() {
    document.querySelector("#calories-consumed").innerText =
      this._consumedCalories;
  }

  _displayBurnedCalories() {
    document.querySelector("#calories-burned").innerText = this._burnedCalories;
  }

  _displayRemainingCalories() {
    document.querySelector("#calories-remaining").innerText =
      this._remainingCalories;
  }

  _displayMeals() {
    document.querySelector("#meal-items").innerHTML = "";
    this._meals.forEach((meal) => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.classList.add("my-2");
      div.innerHTML = `
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between">
            <h4 class="mx-1">${meal.name}</h4>
            <div
              class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
            >
              ${meal.calories}
            </div>
            <button class="delete btn btn-danger btn-sm mx-2">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>`;
      document.querySelector("#meal-items").appendChild(div);
    });
  }

  _displayWorkout() {
    document.querySelector("#workout-items").innerHTML = "";
    this._workouts.forEach((workout) => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.classList.add("my-2");
      div.innerHTML = `
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between">
            <h4 class="mx-1">${workout.name}</h4>
            <div
              class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
            >
              ${workout.calories}
            </div>
            <button class="delete btn btn-danger btn-sm mx-2">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>`;
      document.querySelector("#workout-items").appendChild(div);
    });
  }

  _displayProgress() {
    const progressBar = document.querySelector("#calorie-progress");
    const percentage = (this._totalCalories / this._setCalories) * 100;
    const width = Math.min(percentage, 100);

    progressBar.style.width = `${width}%`;
    if (this._totalCalories > this._setCalories) {
      progressBar.classList.remove("bg-light");
      progressBar.classList.add("bg-danger");
      document.querySelector("#remaining-card").classList.remove("bg-light");
      document.querySelector("#remaining-card").classList.add("bg-danger");
    } else {
      progressBar.classList.remove("bg-danger");
      progressBar.classList.add("bg-primary");
      document.querySelector("#remaining-card").classList.remove("bg-danger");
      document.querySelector("#remaining-card").classList.add("bg-light");
    }
  }

  _renderStats() {
    this._displayBurnedCalories();
    this._displayCaloriesConsumed();
    this._displayRemainingCalories();
    this._displaySetCalories();
    this._displayTotalCalories();
    this._displayProgress();
    this._displayMeals();
    this._displayWorkout();
  }
}

class Meal {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

class App {
  constructor() {
    this._tracker = new CalorieTracker();

    document
      .querySelector("#meal-form")
      .addEventListener("submit", this._newMeal.bind(this));

    document
      .querySelector("#workout-form")
      .addEventListener("submit", this._newWorkout.bind(this));

    document
      .querySelector("#limit-form")
      .addEventListener("submit", this._newDailyLimit.bind(this));
  }

  _newMeal(e) {
    e.preventDefault();

    const name = document.querySelector("#meal-name");
    const calories = document.querySelector("#meal-calories");

    //validate the inputs
    if (name.value === "" || calories.value === "") {
      alert("Enter a valid name and calories");
    } else {
      const meal = new Meal(name.value, +calories.value);
      this._tracker.addMeal(meal);
      name.value = "";
      calories.value = "";
    }
  }

  _newWorkout(e) {
    e.preventDefault();

    const name = document.querySelector("#workout-name");
    const calories = document.querySelector("#workout-calories");

    if (name.value === "" || calories.value === "") {
      alert("Please enter a valid workout and calorie value");
    } else {
      const workout = new Workout(name.value, +calories.value);
      this._tracker.addWorkOut(workout);
      name.value = "";
      calories.value = "";
    }
  }

  _newDailyLimit(e) {
    e.preventDefault();

    const limit = document.querySelector("#limit");

    if (limit.value === "" || isNaN(limit.value)) {
      alert("Please enter a valid number");
    }

    this._tracker._setCalories = +limit.value;
    this._tracker._remainingCalories = +limit.value;

    this._tracker._renderStats();
    limit.value = "";
  }
}

const app = new App();
