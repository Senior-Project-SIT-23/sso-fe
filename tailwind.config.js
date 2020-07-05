module.exports = {
  purge: false,
  theme: {
    fontFamily: {
      sarabun: ['Sarabun'],
      mitr: ['Mitr'],
      inter: ['Inter']
    },
    extend: {
      colors: {
        primary: '#075F83',
        label: '#707070'
      },
      lineHeight: {
        'normal' : '10px'
      }
    },
    customForms: theme => ({
      default: {
        input: {
          fontFamily: theme('fontFamily.sarabun'),
          backgroundColor: theme('colors.blue'),
          '&:focus': {
            backgroundColor: theme('colors.white'),
            boxShadow: undefined,
            borderColor: theme('colors.red')
          }
        },
        textarea: {
          fontFamily: theme('fontFamily.sarabun'),
          backgroundColor: theme('colors.gray.100'),
          '&:focus': {
            backgroundColor: theme('colors.white'),
            boxShadow: undefined,
            borderColor: theme('colors.black')
          }
        },
        select: {
          boxShadow: undefined,
          '&:focus': {
            backgroundColor: theme('colors.white'),
            boxShadow: undefined,
            borderColor: theme('colors.black')
          }
        },
        checkbox: {
          color: theme('colors.primary'),
          '&:focus': {
            boxShadow: undefined,
            borderColor: theme('colors.primary')
          }
        },
        radio: {
          color: theme('colors.primary'),
          '&:focus': {
            boxShadow: undefined,
            borderColor: theme('colors.primary')
          }
        }
      }
    })
  },
  plugins: [require('@tailwindcss/custom-forms')]
}
