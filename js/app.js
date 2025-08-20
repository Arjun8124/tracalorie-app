class CalorieTracker {
  constructor() {
    this._setCalories = Storage.getCalorieLimit();
    this._totalCalories = Storage.getTotalCalories();
    this._consumedCalories = Storage.getConsumedCalories();
    this._burnedCalories = Storage.getBurnedCalories();
    this._meals = Storage.getMeals();
    this._workouts = Storage.getWorkout();
    this._renderStats();
  }

  // public methods

  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    this._consumedCalories += meal.calories;
    this._remainingCalories -= meal.calories;
    Storage.setTotalCalorie(this._totalCalories);
    Storage.setConsumedCalorie(this._consumedCalories);
    Storage.setBurnedCalorie(this._burnedCalories);
    Storage.setMeals(this._meals);
    this._renderStats();
  }

  removeMeal(id) {
    const mealIndex = this._meals.findIndex((meal) => meal.id === id);
    if (mealIndex !== -1) {
      const meal = this._meals[mealIndex];
      this._meals.splice(mealIndex, 1);
      this._totalCalories -= meal.calories;
      this._consumedCalories -= meal.calories;
      this._remainingCalories += meal.calories;
      Storage.setTotalCalorie(this._totalCalories);
      Storage.setConsumedCalorie(this._consumedCalories);
      Storage.setBurnedCalorie(this._burnedCalories);
      Storage.setMeals(this._meals);
      this._renderStats();
    }
  }

  addWorkOut(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    this._burnedCalories += workout.calories;
    this._remainingCalories += workout.calories;
    Storage.setTotalCalorie(this._totalCalories);
    Storage.setConsumedCalorie(this._consumedCalories);
    Storage.setBurnedCalorie(this._burnedCalories);
    Storage.setWorkouts(this._workouts);
    this._renderStats();
  }

  removeWorkout(id) {
    const workoutIndex = this._workouts.findIndex(
      (workout) => workout.id === id
    );
    if (workoutIndex !== -1) {
      const workout = this._workouts[workoutIndex];
      this._workouts.splice(workoutIndex, 1);
      this._totalCalories += workout.calories;
      this._burnedCalories -= workout.calories;
      this._remainingCalories -= workout.calories;
      Storage.setTotalCalorie(this._totalCalories);
      Storage.setConsumedCalorie(this._consumedCalories);
      Storage.setBurnedCalorie(this._burnedCalories);
      Storage.setWorkouts(this._workouts);
      this._renderStats();
    }
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
      this._setCalories - this._totalCalories;
  }

  _displayMeals(array) {
    document.querySelector("#meal-items").innerHTML = "";
    const arr = array;
    arr.forEach((meal) => {
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
            <button class="delete btn btn-danger btn-sm mx-2" id=${meal.id}>
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>`;
      document.querySelector("#meal-items").appendChild(div);
    });

    document.querySelectorAll(".delete").forEach((button) => {
      button.addEventListener("click", (e) => {
        const targetId = e.target.closest("button").getAttribute("id");
        this.removeMeal(targetId);
      });
    });
  }

  _displayWorkout(array) {
    document.querySelector("#workout-items").innerHTML = "";
    const arr = array;
    arr.forEach((workout) => {
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
            <button class="delete btn btn-danger btn-sm mx-2" id= ${workout.id}>
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>`;
      document.querySelector("#workout-items").appendChild(div);
    });

    document.querySelectorAll(".delete").forEach((button) => {
      button.addEventListener("click", (e) => {
        const workoutId = e.target.closest("button").getAttribute("id");
        this.removeWorkout(workoutId);
      });
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

  _displayFilterBars() {
    if (this._meals.length === 0) {
      document.querySelector("#filter-meals").style.display = "none";
    } else {
      document.querySelector("#filter-meals").style.display = "block";
    }
    if (this._workouts.length === 0) {
      document.querySelector("#filter-workouts").style.display = "none";
    } else {
      document.querySelector("#filter-workouts").style.display = "block";
    }
  }

  _renderStats() {
    this._displayBurnedCalories();
    this._displayCaloriesConsumed();
    this._displayRemainingCalories();
    this._displaySetCalories();
    this._displayTotalCalories();
    this._displayProgress();
    this._displayMeals(this._meals);
    this._displayWorkout(this._workouts);
    this._displayFilterBars();
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

class Storage {
  static getCalorieLimit(defaultLimit = 2000) {
    let calorieLimit;
    if (localStorage.getItem("calorieLimit") === null) {
      calorieLimit = defaultLimit;
    } else {
      calorieLimit = +localStorage.getItem("calorieLimit");
    }
    return calorieLimit;
  }
  static getTotalCalories(defaultLimit = 0) {
    let totalCalorie;
    if (localStorage.getItem("totalCalorie") === null) {
      totalCalorie = defaultLimit;
    } else {
      totalCalorie = +localStorage.getItem("totalCalorie");
    }
    return totalCalorie;
  }
  static getConsumedCalories(defaultLimit = 0) {
    let consumedCalorie;
    if (localStorage.getItem("consumedCalorie") === null) {
      consumedCalorie = defaultLimit;
    } else {
      consumedCalorie = +localStorage.getItem("consumedCalorie");
    }
    return consumedCalorie;
  }
  static getBurnedCalories(defaultLimit = 0) {
    let burnedCalorie;
    if (localStorage.getItem("burnedCalorie") === null) {
      burnedCalorie = defaultLimit;
    } else {
      burnedCalorie = +localStorage.getItem("burnedCalorie");
    }
    return burnedCalorie;
  }
  static getMeals() {
    let meals;
    if (localStorage.getItem("meals") === null) {
      meals = [];
    } else {
      meals = JSON.parse(localStorage.getItem("meals"));
    }
    return meals;
  }
  static getWorkout() {
    let workouts;
    if (localStorage.getItem("workouts") === null) {
      workouts = [];
    } else {
      workouts = JSON.parse(localStorage.getItem("workouts"));
    }
    return workouts;
  }
  static setCalorieLimit(limit) {
    localStorage.setItem("calorieLimit", limit);
  }
  static setTotalCalorie(limit) {
    localStorage.setItem("totalCalorie", limit);
  }
  static setConsumedCalorie(limit) {
    localStorage.setItem("consumedCalorie", limit);
  }
  static setBurnedCalorie(limit) {
    localStorage.setItem("burnedCalorie", limit);
  }
  static setMeals(mealArr) {
    localStorage.setItem("meals", JSON.stringify(mealArr));
  }
  static setWorkouts(workoutArr) {
    localStorage.setItem("workouts", JSON.stringify(workoutArr));
  }
  static clearStorage() {
    localStorage.clear();
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

    document
      .querySelector("#filter-meals")
      .addEventListener("input", this._filterMeals.bind(this));

    document
      .querySelector("#filter-workouts")
      .addEventListener("input", this._filterWorkout.bind(this));

    document
      .querySelector("#reset")
      .addEventListener("click", this._resetDay.bind(this));
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
    Storage.setCalorieLimit(limit.value);
    this._tracker._remainingCalories = +limit.value;

    this._tracker._renderStats();
    limit.value = "";
  }

  _filterMeals(e) {
    const typed = e.target.value.toLowerCase();
    let filteredArray = this._tracker._meals.filter((meal) => {
      return meal.name.toLowerCase().includes(typed);
    });
    this._tracker._displayMeals(filteredArray);
  }

  _filterWorkout(e) {
    const typed = e.target.value.toLowerCase();
    let filteredArray = this._tracker._workouts.filter((workout) => {
      return workout.name.toLowerCase().includes(typed);
    });
    this._tracker._displayWorkout(filteredArray);
  }

  _resetDay(e) {
    this._tracker._setCalories = 2000;
    this._tracker._totalCalories = 0;
    this._tracker._consumedCalories = 0;
    this._tracker._burnedCalories = 0;
    this._tracker._meals = [];
    this._tracker._workouts = [];
    Storage.clearStorage();
    this._tracker._renderStats();
  }
}

const app = new App();
