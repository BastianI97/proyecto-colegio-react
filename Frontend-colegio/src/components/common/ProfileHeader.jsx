import PageTabs from './PageTabs'

function ProfileHeader({
  name,
  title,
  subtitle,
  avatar = '👤',
  tabs = [],
  activeTab = '',
  onTabClick,
  nameColor = '#111827',
  titleColor = '#111827',
  subtitleColor = '#374151',
}) {
  return (
    <section style={styles.headerSection}>
      <div style={styles.profileBlock}>
        <div style={styles.avatar}>{avatar}</div>

        <div>
          {name && <p style={{ ...styles.name, color: nameColor }}>{name}</p>}
          <h1 style={{ ...styles.title, color: titleColor }}>{title}</h1>
          {subtitle && <p style={{ ...styles.subtitle, color: subtitleColor }}>{subtitle}</p>}
        </div>
      </div>

      <PageTabs tabs={tabs} activeTab={activeTab} onTabClick={onTabClick} />
    </section>
  )
}

const styles = {
  headerSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '24px',
    flexWrap: 'wrap',
    marginBottom: '22px',
  },
  profileBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
  },
  avatar: {
    width: '92px',
    height: '92px',
    borderRadius: '50%',
    background: '#facc15',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '38px',
    boxShadow: '0 8px 18px rgba(0,0,0,0.15)',
  },
  name: {
    fontSize: '20px',
    marginBottom: '6px',
  },
  title: {
    fontSize: '58px',
    fontWeight: '800',
    lineHeight: 1,
  },
  subtitle: {
    marginTop: '6px',
    fontSize: '18px',
  },
}

export default ProfileHeader