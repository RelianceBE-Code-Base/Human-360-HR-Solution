import * as React from 'react';
import { useState } from 'react';
import styles from './FeedbackCenter.module.scss';
import { Icon } from '@fluentui/react/lib/Icon';
import { SearchBox } from '@fluentui/react/lib/SearchBox';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { Slider } from '@fluentui/react/lib/Slider';
import { TextField } from '@fluentui/react/lib/TextField';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { Rating, RatingSize } from '@fluentui/react/lib/Rating';

interface IFeedbackRequest {
  id: string;
  name: string;
  role: string;
  initials: string;
  dueDate: string;
  daysLeft: number;
}

interface IFeedback {
  id: string;
  fromName: string;
  fromRole: string;
  initials: string;
  receivedDate: string;
  rating: number;
  strengths: string;
  improvements: string;
  skills: {
    communication: number;
    technicalSkills: number;
    teamwork: number;
    leadership: number;
  };
}

export interface IFeedbackCenterProps {
  siteUrl: string;
}

export const FeedbackCenter: React.FC<IFeedbackCenterProps> = (props) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'give' | 'received'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState<IFeedbackRequest | null>(null);
  
  // Form state
  const [feedbackType, setFeedbackType] = useState<'recognition' | 'improvement' | 'general'>('recognition');
  const [rating, setRating] = useState(3);
  const [communication, setCommunication] = useState(4);
  const [technicalSkills, setTechnicalSkills] = useState(5);
  const [teamwork, setTeamwork] = useState(4);
  const [leadership, setLeadership] = useState(3);
  const [strengths, setStrengths] = useState('');
  const [improvements, setImprovements] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Mock data
  const pendingRequests: IFeedbackRequest[] = [
    { id: '1', name: 'Sarah Johnson', role: 'Marketing Specialist', initials: 'SJ', dueDate: 'Due in 2 days', daysLeft: 2 },
    { id: '2', name: 'Mike Rodriguez', role: 'Software Developer', initials: 'MR', dueDate: 'Due in 5 days', daysLeft: 5 },
    { id: '3', name: 'Alex Marsden', role: 'UX Designer', initials: 'AM', dueDate: 'Due in 7 days', daysLeft: 7 },
  ];

  const receivedFeedback: IFeedback[] = [
    {
      id: '1',
      fromName: 'Chris Lee (Manager)',
      fromRole: 'Manager',
      initials: 'CL',
      receivedDate: 'Received on June 2, 2025',
      rating: 5,
      strengths: "Priscilla consistently demonstrates exceptional problem-solving skills. Her recent project work shows his ability to analyze complex issues and develop innovative solutions. He's also been a great team player, helping new team members get up to speed quickly.",
      improvements: "I'd like to see Priscilla take more initiative in leadership opportunities. She has great ideas but sometimes doesn't share them until prompted. Consider volunteering to lead more projects in the coming quarter.",
      skills: {
        communication: 4,
        technicalSkills: 5,
        teamwork: 4,
        leadership: 3
      }
    }
  ];

  const teamMembers: IDropdownOption[] = pendingRequests.map(req => ({
    key: req.id,
    text: `${req.name} - ${req.role}`
  }));

  const handleProvideFeedback = (request: IFeedbackRequest) => {
    setSelectedMember(request);
    setActiveTab('give');
  };

  const handleSubmitFeedback = () => {
    // Handle form submission
    console.log('Submitting feedback...');
    setActiveTab('pending');
    // Reset form
    resetForm();
  };

  const resetForm = () => {
    setFeedbackType('recognition');
    setRating(3);
    setCommunication(4);
    setTechnicalSkills(5);
    setTeamwork(4);
    setLeadership(3);
    setStrengths('');
    setImprovements('');
    setIsAnonymous(false);
  };

  const getDaysLeftColor = (days: number): string => {
    if (days <= 2) return '#ff4444';
    if (days <= 5) return '#ff9500';
    return '#666';
  };

  return (
    <div className={styles.feedbackCenter}>
      <div className={styles.header}>
        <h1>Feedback Center</h1>
        <p>Provide and receive feedback to help your team grow.</p>
      </div>

      <div className={styles.statsCards}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span>Pending Requests</span>
            <Icon iconName="Info" className={styles.infoIcon} />
          </div>
          <div className={styles.statNumber}>5</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span>Feedback Given</span>
            <Icon iconName="Send" className={styles.sendIcon} />
          </div>
          <div className={styles.statNumber}>17</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span>Feedback Received</span>
            <span className={styles.export}>Export</span>
            <Icon iconName="Download" className={styles.downloadIcon} />
          </div>
          <div className={styles.statNumber}>12</div>
        </div>
      </div>

      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === 'pending' ? styles.active : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending Requests
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'give' ? styles.active : ''}`}
          onClick={() => setActiveTab('give')}
        >
          Give Feedback
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'received' ? styles.active : ''}`}
          onClick={() => setActiveTab('received')}
        >
          Received Feedback
        </button>
      </div>

      {activeTab === 'pending' && (
        <div className={styles.tabContent}>
          <p className={styles.description}>You have 5 pending feedback requests to complete.</p>
          
          <SearchBox 
            placeholder="Search requests..."
            className={styles.searchBox}
            onChange={(_, newValue) => setSearchQuery(newValue || '')}
          />

          <div className={styles.requestsList}>
            {pendingRequests.filter(request => 
              request.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
              request.role.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((request) => (
              <div key={request.id} className={styles.requestCard}>
                <div className={styles.requestInfo}>
                  <div className={styles.avatar} style={{backgroundColor: '#6264a7'}}>
                    {request.initials}
                  </div>
                  <div className={styles.details}>
                    <div className={styles.name}>{request.name}</div>
                    <div className={styles.role}>{request.role}</div>
                  </div>
                </div>
                <div className={styles.actions}>
                  <span 
                    className={styles.dueDate}
                    style={{color: getDaysLeftColor(request.daysLeft)}}
                  >
                    {request.dueDate}
                  </span>
                  <DefaultButton 
                    text="Dismiss" 
                    className={styles.dismissBtn}
                  />
                  <PrimaryButton 
                    text="Provide Feedback" 
                    onClick={() => handleProvideFeedback(request)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'give' && (
        <div className={styles.tabContent}>
          <div className={styles.feedbackForm}>
            <Dropdown
              label="Select Team Member"
              placeholder="Select a team member"
              options={teamMembers}
              selectedKey={selectedMember?.id}
              onChange={(_, option) => {
                const member = pendingRequests.find(r => r.id === option?.key);
                setSelectedMember(member || null);
              }}
              className={styles.dropdown}
            />

            <div className={styles.feedbackTypes}>
              <div className={styles.label}>Feedback Type</div>
              <div className={styles.typeButtons}>
                <button 
                  className={`${styles.typeBtn} ${feedbackType === 'recognition' ? styles.active : ''}`}
                  onClick={() => setFeedbackType('recognition')}
                >
                  <Icon iconName="Trophy2" />
                  <span>Recognition</span>
                </button>
                <button 
                  className={`${styles.typeBtn} ${feedbackType === 'improvement' ? styles.active : ''}`}
                  onClick={() => setFeedbackType('improvement')}
                >
                  <Icon iconName="Up" />
                  <span>Improvement</span>
                </button>
                <button 
                  className={`${styles.typeBtn} ${feedbackType === 'general' ? styles.active : ''}`}
                  onClick={() => setFeedbackType('general')}
                >
                  <Icon iconName="Comment" />
                  <span>General</span>
                </button>
              </div>
            </div>

            <div className={styles.ratingSection}>
              <div className={styles.label}>Rating</div>
              <Rating
                min={1}
                max={5}
                rating={rating}
                onChange={(_, newRating) => setRating(newRating || 3)}
                size={RatingSize.Large}
              />
            </div>

            <div className={styles.skillsSection}>
              <div className={styles.label}>Skills Assessment</div>
              
              <div className={styles.skillSlider}>
                <div className={styles.skillHeader}>
                  <span>Communication</span>
                  <span>{communication}/5</span>
                </div>
                <Slider
                  min={1}
                  max={5}
                  step={1}
                  value={communication}
                  onChange={(value) => setCommunication(value)}
                  showValue={false}
                />
              </div>

              <div className={styles.skillSlider}>
                <div className={styles.skillHeader}>
                  <span>Technical Skills</span>
                  <span>{technicalSkills}/5</span>
                </div>
                <Slider
                  min={1}
                  max={5}
                  step={1}
                  value={technicalSkills}
                  onChange={(value) => setTechnicalSkills(value)}
                  showValue={false}
                />
              </div>

              <div className={styles.skillSlider}>
                <div className={styles.skillHeader}>
                  <span>Teamwork</span>
                  <span>{teamwork}/5</span>
                </div>
                <Slider
                  min={1}
                  max={5}
                  step={1}
                  value={teamwork}
                  onChange={(value) => setTeamwork(value)}
                  showValue={false}
                />
              </div>

              <div className={styles.skillSlider}>
                <div className={styles.skillHeader}>
                  <span>Leadership</span>
                  <span>{leadership}/5</span>
                </div>
                <Slider
                  min={1}
                  max={5}
                  step={1}
                  value={leadership}
                  onChange={(value) => setLeadership(value)}
                  showValue={false}
                />
              </div>
            </div>

            <TextField
              label="What did they do well?"
              multiline
              rows={4}
              value={strengths}
              onChange={(_, newValue) => setStrengths(newValue || '')}
              placeholder="Mike is an exceptional team player with great technical skills."
            />

            <TextField
              label="Areas for Improvement"
              multiline
              rows={4}
              value={improvements}
              onChange={(_, newValue) => setImprovements(newValue || '')}
              placeholder="He needs to improve on his communication skill."
            />

            <Checkbox
              label="Make feedback anonymous"
              checked={isAnonymous}
              onChange={(_, checked) => setIsAnonymous(checked || false)}
            />

            <div className={styles.formActions}>
              <DefaultButton text="Save Draft" />
              <PrimaryButton text="Submit Feedback" onClick={handleSubmitFeedback} />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'received' && (
        <div className={styles.tabContent}>
          <p className={styles.description}>Feedback you've received from team members.</p>
          
          <SearchBox 
            placeholder="Search feedback..."
            className={styles.searchBox}
            onChange={(_, newValue) => setSearchQuery(newValue || '')}
          />

          <div className={styles.feedbackList}>
            {receivedFeedback.filter(feedback => 
              feedback.fromName.toLowerCase().includes(searchQuery.toLowerCase()) || 
              feedback.fromRole.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((feedback) => (
              <div key={feedback.id} className={styles.feedbackCard}>
                <div className={styles.feedbackHeader}>
                  <div className={styles.feedbackInfo}>
                    <div className={styles.avatar} style={{backgroundColor: '#6264a7'}}>
                      {feedback.initials}
                    </div>
                    <div>
                      <div className={styles.name}>{feedback.fromName}</div>
                      <div className={styles.date}>{feedback.receivedDate}</div>
                    </div>
                  </div>
                  <Rating
                    min={1}
                    max={5}
                    rating={feedback.rating}
                    readOnly
                    size={RatingSize.Large}
                  />
                </div>

                <div className={styles.feedbackSection}>
                  <h3>Strengths</h3>
                  <p>{feedback.strengths}</p>
                </div>

                <div className={styles.feedbackSection}>
                  <h3>Areas for Improvement</h3>
                  <p>{feedback.improvements}</p>
                </div>

                <div className={styles.skillsAssessment}>
                  <h3>Skill Assessment</h3>
                  <div className={styles.skillsGrid}>
                    <div className={styles.skillItem}>
                      <div className={styles.skillInfo}>
                        <span>Communication</span>
                        <span>{feedback.skills.communication}/5</span>
                      </div>
                      <div className={styles.skillBar}>
                        <div 
                          className={styles.skillFill} 
                          style={{width: `${(feedback.skills.communication / 5) * 100}%`}}
                        />
                      </div>
                    </div>

                    <div className={styles.skillItem}>
                      <div className={styles.skillInfo}>
                        <span>Technical Skills</span>
                        <span>{feedback.skills.technicalSkills}/5</span>
                      </div>
                      <div className={styles.skillBar}>
                        <div 
                          className={styles.skillFill} 
                          style={{width: `${(feedback.skills.technicalSkills / 5) * 100}%`}}
                        />
                      </div>
                    </div>

                    <div className={styles.skillItem}>
                      <div className={styles.skillInfo}>
                        <span>Teamwork</span>
                        <span>{feedback.skills.teamwork}/5</span>
                      </div>
                      <div className={styles.skillBar}>
                        <div 
                          className={styles.skillFill} 
                          style={{width: `${(feedback.skills.teamwork / 5) * 100}%`}}
                        />
                      </div>
                    </div>

                    <div className={styles.skillItem}>
                      <div className={styles.skillInfo}>
                        <span>Leadership</span>
                        <span>{feedback.skills.leadership}/5</span>
                      </div>
                      <div className={styles.skillBar}>
                        <div 
                          className={styles.skillFill} 
                          style={{width: `${(feedback.skills.leadership / 5) * 100}%`}}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};