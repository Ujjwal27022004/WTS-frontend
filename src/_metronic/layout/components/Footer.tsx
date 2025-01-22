import { FC } from "react";
import { useLayout } from "../core";

const Footer: FC = () => {
  // const {classes} = useLayout()
  // return (
  //   <div className='footer py-4 d-flex flex-lg-column' id='kt_footer'>
  //     {/* begin::Container */}
  //     <div
  //       className={`${classes.footerContainer} d-flex flex-column flex-md-row align-items-center justify-content-between`}
  //     >
  //       {/* begin::Copyright */}
  //       <div className='text-gray-900 order-2 order-md-1'>
  //         <span className='text-muted fw-bold me-2'>{new Date().getFullYear()} &copy;</span>
  //         <a href='#' className='text-gray-800 text-hover-primary'>
  //           Keenthemes
  //         </a>
  //       </div>
  //       {/* end::Copyright */}

  //       {/* begin::Nav */}
  //       <ul className='menu menu-gray-600 menu-hover-primary fw-bold order-1'>
  //         <li className='menu-item'>
  //           <a href='#' className='menu-link ps-0 pe-2'>
  //             About
  //           </a>
  //         </li>
  //         <li className='menu-item'>
  //           <a href='#' className='menu-link pe-0 pe-2'>
  //             Contact
  //           </a>
  //         </li>
  //         <li className='menu-item'>
  //           <a href='#' className='menu-link pe-0'>
  //             Query&FAQ
  //           </a>
  //         </li>
  //       </ul>
  //       {/* end::Nav */}
  //     </div>
  //     {/* end::Container */}
  //   </div>
  // )
  return (
    <div style={footer}>
      {/* Invisible container ensures the bot does not overlap */}
    </div>
  );
};

const footer: React.CSSProperties = {
 padding: "5%" // Makes sure the container doesn't interfere with clicks
};
export { Footer };
