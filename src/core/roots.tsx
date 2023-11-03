export const mainRoot = (user: User) => {
  return {
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    id: 'Home',
                    name: 'Home',
                    passProps: {
                      user: user
                    }
                  }
                },
              ]
            }
          },
          {
            stack: {
              children: [
                {
                  id: 'DoctoresList',
                  component: {
                    name: 'DoctoresList',

                  }
                }
              ]
            }
          },
          {
            stack: {
              children: [
                {
                  id: 'Settings',
                  component: {
                    name: 'Settings',
                    passProps: {
                      user: user
                    }
                  }
                }
              ]
            }
          }
        ]
      }
    }
  };
};

export const loginRoot = () => {
  return {
    root: {
      component: {
        name: "Login"
      }
    }
  }
};

export const resetPwdRoot = () => {
  return {
    root: {
      component: {
        name: "ResetPwd"
      }
    }
  }
};

export interface User {
  name: string;
  email: string;
}
