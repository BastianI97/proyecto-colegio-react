import Sidebar from './Sidebar'

function RoleLayout({ background = '#f3f4f6', children }) {
  return (
    <div style={{ ...styles.page, background }}>
      <Sidebar />
      <main style={styles.main}>{children}</main>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
  },
  main: {
    flex: 1,
    padding: '28px',
  },
}

export default RoleLayout