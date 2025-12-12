import * as React from 'react';
import styles from './PerformanceReview.module.scss';

interface IPerformanceReviewProps {
  description: string;
  appearance?: string;
}

interface IPerformanceReviewState {
  currentView: 'dashboard' | 'selfAssessment';
  selfAssessment: {
    overallRating: number;
    keyAccomplishments: string;
    challengesFaced: string;
    technicalSkills: number;
    technicalComments: string;
    communication: number;
    communicationComments: string;
    teamwork: number;
    teamworkComments: string;
    leadership: number;
    leadershipComments: string;
    careerAspirations: string;
  };
  isSubmitted: boolean;
}

export default class PerformanceReview extends React.Component<IPerformanceReviewProps, IPerformanceReviewState> {
  constructor(props: IPerformanceReviewProps) {
    super(props);
    this.state = {
      currentView: 'dashboard',
      selfAssessment: {
        overallRating: 4,
        keyAccomplishments: '',
        challengesFaced: '',
        technicalSkills: 4,
        technicalComments: '',
        communication: 3,
        communicationComments: '',
        teamwork: 4,
        teamworkComments: '',
        leadership: 3,
        leadershipComments: '',
        careerAspirations: ''
      },
      isSubmitted: false
    };
  }

  private handleContinueSelfAssessment = (): void => {
    this.setState({ currentView: 'selfAssessment' });
  };

  private handleSubmitAssessment = (): void => {
    this.setState({ 
      currentView: 'dashboard',
      isSubmitted: true
    });
  };

  private handleSaveDraft = (): void => {
    alert('Draft saved successfully!');
  };

  private updateSelfAssessment = (field: string, value: any): void => {
    this.setState(prevState => ({
      selfAssessment: {
        ...prevState.selfAssessment,
        [field]: value
      }
    }));
  };

  private renderStars(rating: number): JSX.Element {
    return (
      <div className={styles.starRating}>
        {[1, 2, 3, 4, 5].map(star => (
          <span key={star} className={star <= rating ? styles.starFilled : styles.starEmpty}>
            ★
          </span>
        ))}
      </div>
    );
  }

  private renderDashboard(): JSX.Element {
    const { isSubmitted, selfAssessment } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Performance Review</h1>
          <p className={styles.subtitle}>Complete and review performance assessments.</p>
        </div>

        <div className={styles.reviewCard}>
          <div className={styles.reviewHeader}>
            <div>
              <h2 className={styles.reviewTitle}>Q2 2025 Performance Review</h2>
              <p className={styles.dueDate}>Due by July 15, 2025</p>
            </div>
            <span className={styles.statusBadge}>In Progress</span>
          </div>

          <div className={styles.progressSection}>
            <div className={styles.progressItem}>
              <div className={styles.progressLabel}>
                <span>Self Assessment</span>
                <span className={isSubmitted ? styles.statusComplete : styles.statusNotStarted}>
                  {isSubmitted ? 'Complete (100%)' : 'Not Started'}
                </span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: isSubmitted ? '100%' : '0%' }}></div>
              </div>
            </div>

            <div className={styles.progressItem}>
              <div className={styles.progressLabel}>
                <span>Manager Assessment</span>
                <span className={styles.statusInProgress}>In Progress (50%)</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: '50%' }}></div>
              </div>
            </div>

            <div className={styles.progressItem}>
              <div className={styles.progressLabel}>
                <span>Peer Feedback Collection</span>
                <span className={styles.statusComplete}>Complete (100%)</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFillComplete} style={{ width: '100%' }}></div>
              </div>
            </div>

            <div className={styles.progressItem}>
              <div className={styles.progressLabel}>
                <span>Final Review</span>
                <span className={styles.statusPending}>Pending</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: '0%' }}></div>
              </div>
            </div>
          </div>

          {isSubmitted && (
            <div className={styles.submittedDetails}>
              <h3>Submitted Self Assessment Details</h3>
              <div className={styles.detailItem}>
                <strong>Overall Rating:</strong> {this.renderStars(selfAssessment.overallRating)}
              </div>
              <div className={styles.detailItem}>
                <strong>Key Accomplishments:</strong>
                <p>{selfAssessment.keyAccomplishments || 'No response provided'}</p>
              </div>
              <div className={styles.detailItem}>
                <strong>Challenges Faced:</strong>
                <p>{selfAssessment.challengesFaced || 'No response provided'}</p>
              </div>
              <div className={styles.competencyDetails}>
                <h4>Competency Ratings:</h4>
                <div className={styles.competencyItem}>
                  <span>Technical Skills: {selfAssessment.technicalSkills}/5</span>
                </div>
                <div className={styles.competencyItem}>
                  <span>Communication: {selfAssessment.communication}/5</span>
                </div>
                <div className={styles.competencyItem}>
                  <span>Teamwork: {selfAssessment.teamwork}/5</span>
                </div>
                <div className={styles.competencyItem}>
                  <span>Leadership: {selfAssessment.leadership}/5</span>
                </div>
              </div>
              <div className={styles.detailItem}>
                <strong>Career Aspirations:</strong>
                <p>{selfAssessment.careerAspirations || 'No response provided'}</p>
              </div>
            </div>
          )}

          <div className={styles.actionSection}>
            <button className={styles.primaryButton} onClick={this.handleContinueSelfAssessment}>
              {isSubmitted ? 'Edit Self Assessment' : 'Continue Self Assessment'}
            </button>
          </div>
        </div>

        <div className={styles.previousReviews}>
          <h2 className={styles.sectionTitle}>Previous Reviews</h2>
          
          <div className={styles.reviewItem}>
            <div className={styles.reviewInfo}>
              <h3>Q1 2025 Performance Review</h3>
              <p className={styles.completedDate}>Completed on April 10, 2025</p>
            </div>
            <div className={styles.reviewRating}>
              {this.renderStars(4.5)}
              <button className={styles.linkButton}>View Details</button>
            </div>
          </div>

          <div className={styles.reviewItem}>
            <div className={styles.reviewInfo}>
              <h3>Q4 2024 Performance Review</h3>
              <p className={styles.completedDate}>Completed on January 12, 2025</p>
            </div>
            <div className={styles.reviewRating}>
              {this.renderStars(4)}
              <button className={styles.linkButton}>View Details</button>
            </div>
          </div>

          <div className={styles.reviewItem}>
            <div className={styles.reviewInfo}>
              <h3>Q3 2024 Performance Review</h3>
              <p className={styles.completedDate}>Completed on October 8, 2024</p>
            </div>
            <div className={styles.reviewRating}>
              {this.renderStars(4)}
              <button className={styles.linkButton}>View Details</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private renderSelfAssessment(): JSX.Element {
    const { selfAssessment } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.assessmentForm}>
          <h2 className={styles.formTitle}>Self Assessment</h2>

          <div className={styles.formSection}>
            <label className={styles.formLabel}>Overall Performance Rating</label>
            <div className={styles.starRatingInteractive}>
              {[1, 2, 3, 4, 5].map(star => (
                <span
                  key={star}
                  className={star <= selfAssessment.overallRating ? styles.starFilled : styles.starEmpty}
                  onClick={() => this.updateSelfAssessment('overallRating', star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className={styles.formSection}>
            <label className={styles.formLabel}>Key Accomplishments</label>
            <textarea
              className={styles.textArea}
              placeholder="List your key accomplishments during this review period..."
              value={selfAssessment.keyAccomplishments}
              onChange={(e) => this.updateSelfAssessment('keyAccomplishments', e.target.value)}
            />
          </div>

          <div className={styles.formSection}>
            <label className={styles.formLabel}>Challenges Faced</label>
            <textarea
              className={styles.textArea}
              placeholder="What challenges did you face, and how did you address them?"
              value={selfAssessment.challengesFaced}
              onChange={(e) => this.updateSelfAssessment('challengesFaced', e.target.value)}
            />
          </div>

          <div className={styles.competencySection}>
            <h3 className={styles.sectionSubtitle}>Self-Assessment by Competency</h3>

            <div className={styles.competencyItem}>
              <div className={styles.competencyHeader}>
                <label className={styles.competencyLabel}>Technical Skills</label>
                <span className={styles.ratingValue}>{selfAssessment.technicalSkills}/5</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={selfAssessment.technicalSkills}
                onChange={(e) => this.updateSelfAssessment('technicalSkills', parseInt(e.target.value))}
                className={styles.slider}
              />
              <textarea
                className={styles.textArea}
                placeholder="Comments on your technical skills..."
                value={selfAssessment.technicalComments}
                onChange={(e) => this.updateSelfAssessment('technicalComments', e.target.value)}
              />
            </div>

            <div className={styles.competencyItem}>
              <div className={styles.competencyHeader}>
                <label className={styles.competencyLabel}>Communication</label>
                <span className={styles.ratingValue}>{selfAssessment.communication}/5</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={selfAssessment.communication}
                onChange={(e) => this.updateSelfAssessment('communication', parseInt(e.target.value))}
                className={styles.slider}
              />
              <textarea
                className={styles.textArea}
                placeholder="Comments on your communication skills..."
                value={selfAssessment.communicationComments}
                onChange={(e) => this.updateSelfAssessment('communicationComments', e.target.value)}
              />
            </div>

            <div className={styles.competencyItem}>
              <div className={styles.competencyHeader}>
                <label className={styles.competencyLabel}>Teamwork</label>
                <span className={styles.ratingValue}>{selfAssessment.teamwork}/5</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={selfAssessment.teamwork}
                onChange={(e) => this.updateSelfAssessment('teamwork', parseInt(e.target.value))}
                className={styles.slider}
              />
              <textarea
                className={styles.textArea}
                placeholder="Comments on your teamwork..."
                value={selfAssessment.teamworkComments}
                onChange={(e) => this.updateSelfAssessment('teamworkComments', e.target.value)}
              />
            </div>

            <div className={styles.competencyItem}>
              <div className={styles.competencyHeader}>
                <label className={styles.competencyLabel}>Leadership</label>
                <span className={styles.ratingValue}>{selfAssessment.leadership}/5</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={selfAssessment.leadership}
                onChange={(e) => this.updateSelfAssessment('leadership', parseInt(e.target.value))}
                className={styles.slider}
              />
              <textarea
                className={styles.textArea}
                placeholder="Comments on your leadership..."
                value={selfAssessment.leadershipComments}
                onChange={(e) => this.updateSelfAssessment('leadershipComments', e.target.value)}
              />
            </div>
          </div>

          <div className={styles.formSection}>
            <label className={styles.formLabel}>Career Aspirations</label>
            <textarea
              className={styles.textArea}
              placeholder="What are your career aspirations for the next 1-2 years?"
              value={selfAssessment.careerAspirations}
              onChange={(e) => this.updateSelfAssessment('careerAspirations', e.target.value)}
            />
          </div>

          <div className={styles.formActions}>
            <button className={styles.secondaryButton} onClick={this.handleSaveDraft}>
              Save Draft
            </button>
            <button className={styles.primaryButton} onClick={this.handleSubmitAssessment}>
              Submit Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  public render(): React.ReactElement<IPerformanceReviewProps> {
    const { currentView } = this.state;

    return (
      <div className={styles.performanceReview} data-appearance={this.props.appearance || 'default'}>
        {currentView === 'dashboard' ? this.renderDashboard() : this.renderSelfAssessment()}
      </div>
    );
  }
}