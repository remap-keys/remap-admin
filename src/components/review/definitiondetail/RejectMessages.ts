export const RejectMessages: { short: string; long: string }[] = [
  {
    short: 'The submitter of the pull request is not the applicant.',
    long:
      'Sorry, we rejected your request because the person who submitted the pull request is not you. Please read and confirm the Remap Review Policy.',
  },
  {
    short: 'The product name does not match the PRODUCT value.',
    long:
      'Sorry, we rejected your request because the product name does not match the actual PRODUCT value in the config.h file.',
  },
  {
    short: 'The 1st pull request is empty.',
    long:
      'Sorry, we rejected your request because the value of the 1st pull request URL is empty. Please input the URL which is your 1st pull request of this keyboard to the qmk/qmk_firmware.',
  },
  {
    short: 'The 1st pull request is invalid.',
    long:
      'Sorry, we rejected your request because the value of the 1st pull request URL is invalid. Please input the URL which is your 1st pull request of this keyboard to the qmk/qmk_firmware.',
  },
];
