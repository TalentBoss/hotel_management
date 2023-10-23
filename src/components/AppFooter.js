import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <span className="ms-1">&copy; 2023 Lucas Cumberlege.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://www.theseaclub.es/es/" target="_blank" rel="noopener noreferrer">
          The Sea Club Cala Ratjada SL
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
