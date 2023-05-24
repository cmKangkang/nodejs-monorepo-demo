module.exports = {
  // 配置模板
  template: `  
    ## {{type}}: {{summary}}  

    {{#if commits}}  
    ### Commits  

    {{#each commits}}  
    - {{this.subject}}  

      {{this.notes}}  
    {{/each}}  
    {{/if}}  

    {{#if dependents}}  
    ### Dependents  

    {{#each dependents}}  
    - {{this}}  
    {{/each}}  
    {{/if}}  
  `,
  // 配置版本前缀
  changelog: {
    // 配置版本前缀
    prerelease:
      'Prerelease Changes for <%= version %> - <%= new Date().toLocaleDateString() %>',
    patch:
      'Patch Changes for <%= version %> - <%= new Date().toLocaleDateString() %>',
    minor:
      'Minor Changes for <%= version %> - <%= new Date().toLocaleDateString() %>',
    major:
      'Major Changes for <%= version %> - <%= new Date().toLocaleDateString() %>'
  }
}
