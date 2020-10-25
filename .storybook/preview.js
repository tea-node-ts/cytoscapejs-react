import React from 'react'
import { 
  Title,
  Subtitle,
  Description,
  Primary,
  Props,
  Stories,
  PRIMARY_STORY,
  ArgsTable 
} from '@storybook/addon-docs/blocks'
import '@storybook/addon-console'

export const parameters = {  
  docs: {
    page: () => (
      <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
    )
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: { expanded: true },
}

// export const decorators = [(Story) => <div style={{ margin: 0, height: '400px' }}><Story/></div>];