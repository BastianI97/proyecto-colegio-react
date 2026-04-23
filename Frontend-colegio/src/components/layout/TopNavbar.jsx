function TopNavbar({
  title,
  subtitle,
  tabs = [],
  activeTab = '',
  actions = [],
  titleColor = '#ffffff',
  subtitleColor = 'rgba(255,255,255,0.8)',
  onTabClick,
  onActionClick,
}) {
  return (
    <div style={styles.wrapper}>
      <div>
        <p style={{ ...styles.subtitle, color: subtitleColor }}>{subtitle}</p>
        <h1 style={{ ...styles.title, color: titleColor }}>{title}</h1>
      </div>

      <div style={styles.rightSide}>
        {tabs.length > 0 && (
          <div style={styles.tabsContainer}>
            {tabs.map((tab) => {
              const label = typeof tab === 'string' ? tab : tab.label
              const value = typeof tab === 'string' ? tab : tab.value ?? tab.label

              return (
                <button
                  key={value}
                  onClick={() => onTabClick?.(tab)}
                  style={{
                    ...styles.tab,
                    ...(activeTab === value ? styles.activeTab : {}),
                  }}
                >
                  {label}
                </button>
              )
            })}
          </div>
        )}

        {actions.length > 0 && (
          <div style={styles.actionsContainer}>
            {actions.map((action) => (
              <button
                key={action.label}
                onClick={() => onActionClick?.(action)}
                style={{
                  ...styles.actionButton,
                  background: action.background || '#ffffff',
                  color: action.color || '#111827',
                }}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '20px',
    flexWrap: 'wrap',
    marginBottom: '24px',
  },
  subtitle: {
    fontSize: '20px',
    marginBottom: '6px',
  },
  title: {
    fontSize: '56px',
    fontWeight: '800',
    lineHeight: 1,
  },
  rightSide: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '14px',
  },
  tabsContainer: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  tab: {
    border: 'none',
    background: '#f4efe2',
    color: '#111827',
    padding: '12px 22px',
    borderRadius: '14px',
    fontSize: '18px',
    cursor: 'pointer',
  },
  activeTab: {
    background: '#8fd0ff',
  },
  actionsContainer: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  actionButton: {
    border: 'none',
    padding: '12px 22px',
    borderRadius: '14px',
    fontSize: '18px',
    cursor: 'pointer',
    fontWeight: '600',
  },
}

export default TopNavbar