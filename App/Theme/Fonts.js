import Metrics from "./Metrics"

const size = {
    h1: 40,
    h2: 32,
    h3: 30,
    h4: 24,
    input: 18,
    big: 24,
    regular: 18,
    medium: 18,
    small: 12,
    tiny: 10,
  }
  
  const style = {
    h1: {
      fontFamily: Metrics.platform == 'ios' ? 'Turret Road' : 'TurretRoad.ttf',
      fontSize: size.h1,
    },
    h2: {
      fontFamily: Metrics.platform == 'ios' ? 'Turret Road' : 'TurretRoad.ttf',
      fontSize: size.h2,
    },
    h3: {
      fontFamily: Metrics.platform == 'ios' ? 'Turret Road' : 'TurretRoad.ttf',
      fontSize: size.h3,
    },
    h4: {
      fontFamily: Metrics.platform == 'ios' ? 'Turret Road' : 'TurretRoad.ttf',
      fontSize: size.h4,
    },
    big: {
      fontFamily: Metrics.platform == 'ios' ? 'Turret Road' : 'TurretRoad.ttf',
      fontSize: size.big,
    },
    normal: {
      fontFamily: Metrics.platform == 'ios' ? 'Turret Road' : 'TurretRoad.ttf',
      fontSize: size.regular,
      fontWeight: "600"
    },
    medium: {
      fontFamily: Metrics.platform == 'ios' ? 'Turret Road' : 'TurretRoad.ttf',
      fontSize: size.medium
    },
    small: {
      fontFamily: Metrics.platform == 'ios' ? 'Turret Road' : 'TurretRoad.ttf',
      fontSize: size.small
    },
    tiny: {
      fontFamily: Metrics.platform == 'ios' ? 'Turret Road' : 'TurretRoad.ttf',
      fontSize: size.tiny
    },
  }
  
  export default {
    size,
    style,
  }
  