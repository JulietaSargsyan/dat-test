// // class ErrorBoundary extends React.Component {
// //   constructor(props: any) {
// //     super(props);
// //     this.state = { hasError: false };
// //   }

// //   static getDerivedStateFromError(error: any) {
// //     // Update state so the next render will show the fallback UI.
// //     console.log(error);
    
// //     return { hasError: true };
// //   }

// //   componentDidCatch(error: any, info: any) {
// //     // Example "componentStack":
// //     //   in ComponentThatThrows (created by App)
// //     //   in ErrorBoundary (created by App)
// //     //   in div (created by App)
// //     //   in App
// //     logErrorToMyService(error, info.componentStack);
// //   }

// //   render() {
// //     if (this.state.hasError) {
// //       // You can render any custom fallback UI
// //       return this.props.fallback;
// //     }

// //     return this.props.children;
// //   }
// // }





// ///////////////////////

// import React from 'react';

// class ErrorBoundary extends React.Component {
//   constructor(props: any) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error: any) {
//     // Update state so the next render will show the fallback UI.
//     console.log(error);
//     return { hasError: true };
//   }

//   componentDidCatch(error: any, info: any) {
//     // Example "componentStack":
//     //   in ComponentThatThrows (created by App)
//     //   in ErrorBoundary (created by App)
//     //   in div (created by App)
//     //   in App
//     console.error(error, info.componentStack);
//   }

//   render() {
//     if (this.state.hasError) {
//       // You can render any custom fallback UI
//       return this.props.fallback;
//     }

//     return this.props.children;
//   }
// }

// export default ErrorBoundary;
