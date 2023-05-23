# 🎲 King of Slots Game

Casino slot machine game developed with web technologies (HTML5)

___

## 🚀 Getting started
```
npm install
npm run dev
```

## Project streucture

**Top level structure**
```
.github/ - GitHub environment configurations
├─ workflows/ - GitHub Action workflows for auto build & deploy
king-of-slots/ - The directory with game source code and assets
├─ assets/ - Directory with static assets and texture packer configuration
├─ public/ - static files served
├─ src/ - source code of the game
│  ├─ layers/ - the game is visualy separated in multiple layers for better code management 
│  ├─ services/ - the business logic of the game is divided into multiple services
│  ├─ main.ts - game entrypoint (runnable)
│  ├─ index.html - browser entrypoint HTML file
├─ package.json
slot-base/ NPM package used to share common parts of each game
.gitignore
package.json

```

**slot-base package structure**
```
lib/
src/ - 
├─ core/ - 
├─ hooks/ - 
├─ slices/ - 
├─ ui/ - 
├─ CustomLoggingFactory.ts
├─ Runtime.ts
├─ RootElement.ts
├─ Context.ts
├─ main.ts
package.json
```

## ✔️ Tasks
- [x] Create HTML5 canvas using PixiJS inside web application developed with ReactJS
- [x] Setup building pipelines for typescript -> live demo
- [x] Design the project to support inheritance and to be easily configurable
- [x] Separate in mutiple subprojects inside monorepo to improve reusability
- [x] create game config
- [x] implement layer manager for managing different layers of logic
- [x] Create background image
- [x] asset loading
- [x] Reel container with multiple reels
- [x] Spin functionality
- [x] Spin button interaction
- [ ] UML diagram of solution

### ➕ Bonus tasks
- [ ] Create simple sprite animation
- [ ] include multiple levels, scores, server infra in UML Diagram 
- [x] Bet increase / decrease
- [ ] Full screen button
- [ ] Anticipation 
- [ ] Bonus spins
- [ ] Debug interface

## 🚢 Deployment
The project is built as single page web app (static files) and hosted on GitHub pages

**URL**: [king-of-slots.demo.kalevski.dev](https://king-of-slots.demo.kalevski.dev/)


