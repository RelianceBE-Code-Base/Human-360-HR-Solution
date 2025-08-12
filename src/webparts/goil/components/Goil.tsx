import * as React from 'react';
import styles from './Goil.module.scss';
import type { IGoilProps } from './IGoilProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Goil extends React.Component<IGoilProps> {
  public render(): React.ReactElement<IGoilProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
    } = this.props;

    return (
      <>      
      <section className={`${styles.goil} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
          <h2>Welcome to GOIL KPI Management Tracker!</h2>
          <div>{environmentMessage}</div>
          <div>Web part property value: <strong>{escape(description)}</strong></div>
        </div>

      </section>
      </>
    );
  }
}