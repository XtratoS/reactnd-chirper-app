# Planning:
## 1. Identify Each View:
1. Create a mockup for every view in our app (draw the different views).
2. Specify every view's requirements (Use-Case)
## 2. Break Each View Into a Heirarchy of Components:
1. Identify components of each view and heirarchify them.
2. Eliminate similar components to come up with a list of all required components. 
## 3. Determine Events and How They Affect Our Data:
- For Every Component:
    1. We determine what data they need to render in order to find the actions that need to be executed by the app without user interaction (Initial Data).
    2. We determine what actions can the user take.
## 4. Determine What Data Lives in the Store:
1. Examples:
    - Form data only live inside the form component (Component).
    - Logged in user lives throughout the whole app (Store).
2. Create a [Normalized State](https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape)