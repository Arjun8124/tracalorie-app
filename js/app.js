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
}

const app = new App();
