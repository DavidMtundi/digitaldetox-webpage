'use client';

import { useState } from 'react';
import { Plus, Save, Edit, Trash2, Eye } from 'lucide-react';
import { themeStyles } from '../../../styles/theme';

interface PrivacyVersion {
  version: string;
  effectiveDate: string;
  lastUpdated: string;
  isCurrent: boolean;
  changes?: string[];
}

export default function PrivacyPolicyAdmin() {
  const [versions, setVersions] = useState<PrivacyVersion[]>([
    {
      version: "1.0",
      effectiveDate: "October 22, 2024",
      lastUpdated: "October 22, 2024",
      isCurrent: true,
      changes: [
        "Initial privacy policy release",
        "Established data collection practices",
        "Defined user rights and permissions",
        "Implemented Firebase integration policies"
      ]
    },
    {
      version: "0.9",
      effectiveDate: "September 15, 2024",
      lastUpdated: "September 15, 2024",
      isCurrent: false,
      changes: [
        "Beta version privacy policy",
        "Limited data collection during testing",
        "Basic user rights framework"
      ]
    }
  ]);

  const [editingVersion, setEditingVersion] = useState<string | null>(null);
  const [newVersion, setNewVersion] = useState<Partial<PrivacyVersion>>({
    version: '',
    effectiveDate: '',
    lastUpdated: '',
    isCurrent: false,
    changes: []
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddVersion = () => {
    if (newVersion.version && newVersion.effectiveDate) {
      // If this is set as current, make others not current
      if (newVersion.isCurrent) {
        setVersions(prev => prev.map(v => ({ ...v, isCurrent: false })));
      }
      
      setVersions(prev => [...prev, {
        version: newVersion.version!,
        effectiveDate: newVersion.effectiveDate!,
        lastUpdated: newVersion.lastUpdated || new Date().toLocaleDateString(),
        isCurrent: newVersion.isCurrent || false,
        changes: newVersion.changes || []
      }]);
      
      setNewVersion({
        version: '',
        effectiveDate: '',
        lastUpdated: '',
        isCurrent: false,
        changes: []
      });
      setShowAddForm(false);
    }
  };

  const handleSetCurrent = (version: string) => {
    setVersions(prev => prev.map(v => ({
      ...v,
      isCurrent: v.version === version
    })));
  };

  const handleDeleteVersion = (version: string) => {
    if (confirm('Are you sure you want to delete this version?')) {
      setVersions(prev => prev.filter(v => v.version !== version));
    }
  };

  const generateVersionCode = () => {
    const versionsCode = versions.map(v => ({
      version: v.version,
      effectiveDate: v.effectiveDate,
      lastUpdated: v.lastUpdated,
      isCurrent: v.isCurrent,
      changes: v.changes
    }));

    return `export const privacyPolicyVersions = {
  versions: ${JSON.stringify(versionsCode, null, 2)}
};`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold" style={themeStyles.text.primary}>
              Privacy Policy Version Management
            </h1>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Version</span>
            </button>
          </div>

          {/* Add New Version Form */}
          {showAddForm && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Add New Version</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Version Number</label>
                  <input
                    type="text"
                    value={newVersion.version || ''}
                    onChange={(e) => setNewVersion(prev => ({ ...prev, version: e.target.value }))}
                    placeholder="e.g., 1.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Effective Date</label>
                  <input
                    type="text"
                    value={newVersion.effectiveDate || ''}
                    onChange={(e) => setNewVersion(prev => ({ ...prev, effectiveDate: e.target.value }))}
                    placeholder="e.g., November 15, 2024"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Updated</label>
                  <input
                    type="text"
                    value={newVersion.lastUpdated || ''}
                    onChange={(e) => setNewVersion(prev => ({ ...prev, lastUpdated: e.target.value }))}
                    placeholder="e.g., November 15, 2024"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isCurrent"
                    checked={newVersion.isCurrent || false}
                    onChange={(e) => setNewVersion(prev => ({ ...prev, isCurrent: e.target.checked }))}
                    className="mr-2"
                  />
                  <label htmlFor="isCurrent" className="text-sm font-medium">
                    Set as Current Version
                  </label>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Changes in this version</label>
                <textarea
                  value={newVersion.changes?.join('\n') || ''}
                  onChange={(e) => setNewVersion(prev => ({ 
                    ...prev, 
                    changes: e.target.value.split('\n').filter(line => line.trim()) 
                  }))}
                  placeholder="Enter each change on a new line..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={handleAddVersion}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Add Version</span>
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Versions List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Current Versions</h2>
            {versions.map((version) => (
              <div
                key={version.version}
                className={`p-4 rounded-lg border ${
                  version.isCurrent 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold text-lg">
                      Version {version.version}
                    </h3>
                    {version.isCurrent && (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {!version.isCurrent && (
                      <button
                        onClick={() => handleSetCurrent(version.version)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        Set as Current
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteVersion(version.version)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-500 mb-2">
                  Effective: {version.effectiveDate} | Updated: {version.lastUpdated}
                </div>
                {version.changes && version.changes.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Changes:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      {version.changes.map((change, index) => (
                        <li key={index}>{change}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Code Generation */}
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Generated Code</h2>
            <p className="text-sm text-gray-600 mb-4">
              Copy this code and update your privacy-policy.ts file:
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
              {generateVersionCode()}
            </pre>
            <button
              onClick={() => navigator.clipboard.writeText(generateVersionCode())}
              className="mt-4 btn-secondary"
            >
              Copy Code
            </button>
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-blue-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">How to Use</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
              <li>Add new versions using the form above</li>
              <li>Copy the generated code</li>
              <li>Update the <code>src/data/privacy-policy.ts</code> file</li>
              <li>Add version-specific content in the <code>versionSpecificContent</code> object</li>
              <li>Deploy your changes</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
