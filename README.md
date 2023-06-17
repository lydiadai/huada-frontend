# Project setup

## Init project
1. Create a new branch named as '<projectName\>/dev' from master branch
2. Change 'config.js' file to customize some global behavior
> Git branch detail refer to 'Git branch setup' chapter

## Recommend IDE

Recommend use vscode with at least follow extensions:

- ESLint
- Prettier
- Vue Language Feature (Volar)

## Used framework
- Vue 3
- Vue-router
- Pinia
- Stylus | Less (Do not use Scss)
- Vant | Element-ui (Import on demand)
- Axios
- Dayjs

## Code style

Use eslint & Standard code style guide. 
**When you commit some changes to git, will automatically check code style. Please follow!!!**

## Folders
```
+---.husky                  // Do not change
+---.devops                 // Devops configs
+---public
+---env                     // .env.*** configs
\---src                     // With alias @
    +---assets              // With alias @assets
    |   +---odoo            // Odoo assets js files, with alias @odoo
    |   |   +---core
    |   |   \---lib
    |   |       +---api.js  // Odoo base api definition
    |   |       \---http.js // Odoo base request definition
    |   +---styles          // Common styles
    |   +---svgs
    |   \---utils
    +---baseComponents      // Base components based by odoo models
    +---components          // Project Components, with alias @comp
    +---http                // HTTP request, based use axios
    +---pages               // Pages definition, with alias @pages
    +---router              // Vue-router config
    |   \---routes          // Routes definition
    +---services            // Business logic & data logic definition, with alias @services
    \---store               // Pinia store definition, with alias @store
```

# Git branch setup

Git repository is look like this:

- master (framework)
- /<projectName\>
    - /feature
        - <featureName\>
    - dev
    - sit
    - uat
    - prod
    - /hotfix

> Branch flow detail refer to Teem Git Flow definition.

> #### **Base** branch
> This branch is project setup branch, some base framework usage and project default setting is setup in this branch.
>
> #### **\<projectName\>** folder
> Each different project should create new folder in git branch and named by project name. All customise code and setting
>
> #### **<feature\>** folder
> All new feature should branch under feature folder to develop
>
> #### **dev** branch
> Dev branch stand for developed feature that ready to deploy
>
> #### **sit** branch
> Sit branch contains all developed & developing feature. Target to dev env.
>
> #### **uat** branch
> Uat branch contains all developed & tested feature. Target to ust env.
>
> #### **prod** branch
>Prod branch is only merged from uat branch & hotfix branch. target to prod env.
>
> #### **hotfix** branch
> Hotfix branch contains all prod bug. After fix should merge into prod & dev branch.
