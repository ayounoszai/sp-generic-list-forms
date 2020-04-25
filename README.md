# sp-generic-list-forms

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### SharePoint modifications
Within SharePoint Designer, create new default versions of the list's new, edit and display forms.  Edit each page so that they basically match their counterparts within the SharePointDesignerForms folder (unfortunately, copy/pasting the <WebPartPages:WebPartZone> content, then updating the relevant values doesn't seem to work).  Update/comment out which set of references you need (depending on whether you're doing DEVELOPMENT via the project being served locally or have built out the files for PRODUCTION).
