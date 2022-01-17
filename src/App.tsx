import React from 'react';
import { SnackbarProvider } from 'notistack';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StyledComponentProps } from '@mui/material/styles';
import Review from './components/review/Review.container';
import Top from './components/top/Top.container';
import Organizations from './components/organizations/Organizations.container';
import { withStyles } from '@mui/styles';

class App extends React.Component<StyledComponentProps, {}> {
  constructor(
    props: StyledComponentProps<string> | Readonly<StyledComponentProps<string>>
  ) {
    super(props);
  }
  render() {
    return (
      <SnackbarProvider
        dense
        preventDuplicate
        hideIconVariant
        maxSnack={4}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        classes={{
          variantSuccess: this.props.classes!.success,
          variantError: this.props.classes!.error,
          variantWarning: this.props.classes!.warning,
          variantInfo: this.props.classes!.info,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/review" element={<Review />} />
            <Route path="/review/:definitionId" element={<Review />} />
            <Route path="/organizations" element={<Organizations />} />
            <Route path="/" element={<Top />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    );
  }
}
const styles = () => ({
  success: { backgroundColor: '#3f51b5!important' },
  error: { backgroundColor: '#f44336!important' },
  warning: { backgroundColor: '#ff9800!important' },
  info: { backgroundColor: '#8bc34a!important' },
});

export default withStyles(styles, { withTheme: true })(App);
